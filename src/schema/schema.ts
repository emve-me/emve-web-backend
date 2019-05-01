import { gql, withFilter } from 'apollo-server'
import gapiToGraphQL from 'gapi-to-graphql'
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import { makeExecutableSchema, mergeSchemas, IResolvers } from 'graphql-tools'
import { TContext } from '../../global'
import { pg, pubsub, upsert } from '../dbConnections'
import { fromBase26, toBase26 } from '../Base26'
import IMarkTrackAsPlayedOnMutationArguments = GQL.IMarkTrackAsPlayedOnMutationArguments
import { dateResolver } from '../dateResolver'
import IRemoveTrackOnMutationArguments = GQL.IRemoveTrackOnMutationArguments

const PUBSUB_CHANNEL = 'VIDEO_ADDED'
const PUBSUB_PLAYER = 'PLAYER_CONTROL'

const handSchema = gql`
  schema {
    mutation: Mutation
    subscription: Subscription
    query: Query
  }

  input VideoPushInput {
    videoId: ID!
    channel: ID!
    title: String
    time: Int
  }

  input ChannelCreateInput {
    channelName: String
  }

  input ChannelJoinInput {
    channelId: ID!
  }

  type User {
    id: ID
    googleId: ID
    email: String
    emailVerified: Boolean
    picture: String
    fullName: String
    firstName: String
    lastName: String
    locale: String
    createdOn: String
  }

  type TracksEdge {
    node: Track
    cursor: ID
  }

  type Tracks {
    totalCount: Int
    edges: [TracksEdge]
    pageInfo: TrackPageInfo
  }

  type TrackPageInfo {
    endCursor: ID
    hasNextPage: Boolean
  }

  enum TrackState {
    playing
    played
    upcoming
    remove
  }

  type Track {
    id: ID
    videoId: ID
    title: String
    owner: User
    addedOn: String
    state: TrackState
    thumb: String
  }

  type Channel {
    id: ID
    createdOn: String
    track: Track
    name: String
    owner: User
    tracks(first: Int, after: ID, played: Boolean): Tracks
    nowPlaying: Track
  }

  type Query {
    channel(id: ID!): Channel
    loggedInUser: User
  }

  input MarkTrakAsPlayedInput {
    track: ID!
    nextTrack: ID
  }

  input RemoveTrackInput {
    track: ID!
  }

  type Mutation {
    channelCreate(input: ChannelCreateInput!): ID
    videoPush(input: VideoPushInput!): Track
    authenticate: User
    removeTrack(input: RemoveTrackInput!): ID
    markTrackAsPlayed(input: MarkTrakAsPlayedInput!): ID
    channelJoin(input: ChannelJoinInput!): Channel
  }

  input TrackUpdatedInput {
    channel: ID
  }

  input PlayerControlInput {
    channel: ID
  }

  enum PlayerControlAction {
    PAUSE
    PLAY
    SKIP
    FULLSCREEN
    EXIT_FULLSCREEN
  }

  type PlayerControl {
    action: PlayerControlAction
  }

  type Subscription {
    trackUpdated(input: TrackUpdatedInput!): Track
    playerControl(input: PlayerControlInput!): PlayerControl
  }
`
const resolvers = {
  User: {
    createdOn: ({ createdOn }) => dateResolver(createdOn),
    // todo: when needed, wrap email behind security
    email: () => null,
    googleId: () => null,
    emailVerified: () => null,
    fullName: ({ first_name, last_name }) => `${first_name} ${last_name}`,
    firstName: ({ first_name }) => first_name,
    lastName: ({ last_name }) => last_name
  },
  Track: {
    addedOn: ({ addedOn }) => dateResolver(addedOn),
    owner: (parent, _, ctx: TContext) => ctx.loaders.users.load(parent.owner),
    videoId: ({ video_id }) => video_id,
    thumb: ({ video_id }) => `https://i.ytimg.com/vi/${video_id}/hqdefault.jpg`,
    state: ({ played }) => {
      if (played === true) {
        return 'played'
      } else if (played === false) {
        return 'upcoming'
      } else if (played === 'now') {
        return 'playing'
      } else if (played === 'remove') {
        return 'remove'
      }
    }
  },
  Query: {
    loggedInUser: async (_, __, ctx: TContext) => {
      if (!ctx.user) {
        return null
      }

      return await ctx.user.getDBUser()
    },
    channel: async (_, { id }, ctx) => {
      const dbId = fromBase26(id)
      const [channelRow] = await pg('channels')
        .select('*')
        .where({ id: dbId })

      const channelObj = { ...channelRow, id, dbId }

      if (channelObj.now_playing) {
        // on song insert it can set now playing
      } else {
        const [nowPlaying] = await pg('tracks')
          .select('*')
          .where({
            channel: dbId,
            played: false
          })
          .orderBy('added_on', 'asc')
          .limit(1)

        channelObj.__nowPlaying = nowPlaying

        if (nowPlaying) {
          const updatedOnTable = await pg('channels')
            .update({ now_playing: nowPlaying.id })
            .where({ id: dbId })
          console.log('Updated now playying on channel')
        }
      }

      return channelObj
    }
  },
  Channel: {
    createdOn: ({ createdOn }) => dateResolver(createdOn),
    owner: (parent, _, ctx: TContext) => ctx.loaders.users.load(parent.owner),

    tracks: async (parent, { first, after, played }, ctx) => {
      const whereClause: { channel: string; played?: boolean } = { channel: parent.dbId }

      if (played !== undefined) {
        whereClause.played = played
      }

      const tracks = await pg('tracks')
        .select('*')
        .where(function() {
          this.where(whereClause).andWhere(function() {
            if (played === false) {
              this.where('tracks.id', '!=', parent.now_playing)
            }
          })
        })
        .orderBy('added_on', 'asc')

      const edges = tracks.map(track => ({
        cursor: track.id,
        node: { ...track, played: track.id === parent.now_playing ? 'now' : track.played }
      }))

      return { totalCount: tracks.length, edges, channel_owner: parent.owner }
    },
    nowPlaying: async (parent, _, ctx: TContext) => {
      const getNowPlaying = async () => {
        if (parent.__nowPlaying) {
          return parent.__nowPlaying
        } else if (parent.now_playing) {
          return ctx.loaders.tracks.load(parent.now_playing)
        }
      }

      const tReturn = await getNowPlaying()

      if (tReturn) {
        return { ...tReturn, played: 'now', channel_owner: parent.owner }
      }
    }
  },
  Mutation: {
    removeTrack: async (parent, { input: { track } }: IRemoveTrackOnMutationArguments, ctx: TContext) => {
      const [trackToRemove] = await pg('tracks')
        .join('channels', 'tracks.channel', '=', 'channels.id')
        .where({ 'tracks.id': track })
        .select(
          'channels.now_playing',
          { channelOwner: 'channels.owner' },
          { trackId: 'tracks.id' },
          { trackOwner: 'tracks.owner' },
          'video_id',
          'channel'
        )

      const loggedInUserId = (await ctx.user.getDBUser()).id

      const isChannelOwner = trackToRemove.channelOwner === loggedInUserId
      const isTrackOwner = (trackToRemove.trackOwner = loggedInUserId)

      if (trackToRemove.now_playing === track && isChannelOwner) {
        console.log('issued pubsub to ski[')
        pubsub.publish(PUBSUB_PLAYER, {
          channel: trackToRemove.channel,
          playerControl: {
            action: 'SKIP'
          }
        })
      } else if (isChannelOwner || isTrackOwner) {
        pubsub.publish(PUBSUB_CHANNEL, {
          trackUpdated: {
            id: track,
            played: 'remove',
            channel: trackToRemove.channel,
            owner: trackToRemove.trackOwner,
            video_id: trackToRemove.video_id
          }
        })

        const deleteResp = await pg('tracks')
          .delete()
          .where({ id: track })
          .limit(1)
        console.log({ deleteResp })
      }
    },
    markTrackAsPlayed: async (parent, args: IMarkTrackAsPlayedOnMutationArguments, ctx: TContext) => {
      const { nextTrack, track } = args.input
      // get track // get channel from track // see if channel is owned by tgit a
      // query makes sure that only the owner of the channel can mark the track as played

      const channelOwnerQuery = pg('users')
        .select('id')
        .where({ google_id: ctx.user.sub })

      const channelsOwner = pg('channels')
        .select('id')
        .where({
          id: pg.raw('tracks.channel'),
          owner: channelOwnerQuery
        })

      const [updateResp] = await pg('tracks')
        .update({ played: true })
        .where({
          id: track,
          channel: channelsOwner
        })
        .returning('*')

      if (updateResp) {
        pubsub.publish(PUBSUB_CHANNEL, { trackUpdated: updateResp })

        if (nextTrack) {
          const [trackInfo] = await pg('tracks')
            .select('*')
            .where({ id: nextTrack })
          trackInfo.played = 'now'
          pubsub.publish(PUBSUB_CHANNEL, { trackUpdated: trackInfo })
        }

        const updateChannelResp = await pg('channels')
          .update({ now_playing: nextTrack || null })
          .where({ id: updateResp.channel })
          .returning('*')
      } else {
        // set now playing on channel
        throw 'Unable to mark track as played, please make sure your viewing the right party under the right Google Account'
      }

      return track
    },
    async authenticate(_, __, ctx: TContext): Promise<string> {
      const {
        sub: google_id,
        email,
        email_verified,
        picture,
        given_name: first_name,
        family_name: last_name,
        locale
      } = ctx.user

      const upsertResponse = await upsert({
        table: 'users',
        object: {
          google_id,
          email,
          email_verified,
          picture,
          first_name,
          last_name,
          locale
        },
        key: 'google_id'
      })

      return upsertResponse
    },
    async videoPush(_, { input: { channel, videoId, title } }: GQL.IVideoPushOnMutationArguments, ctx: TContext) {
      const channelId = fromBase26(channel)
      const [videoAddedResponse] = await pg('tracks')
        .insert({
          channel: channelId,
          video_id: videoId,
          title,
          owner: pg('users')
            .select('id')
            .where({ google_id: ctx.user.sub })
        })
        .returning('*')

      // videoAddedResponse.channel = channel

      const [{ now_playing }] = await pg('channels')
        .select('now_playing')
        .where({ id: channelId })

      if (!now_playing) {
        videoAddedResponse.played = 'now'
        pubsub.publish(PUBSUB_CHANNEL, { trackUpdated: videoAddedResponse })
        await pg('channels')
          .update({ now_playing: videoAddedResponse.id })
          .where({ id: channelId })
      } else {
        pubsub.publish(PUBSUB_CHANNEL, { trackUpdated: videoAddedResponse })
      }

      return videoAddedResponse
    },
    async channelCreate(
      _,
      { input: { channelName } }: GQL.IChannelCreateOnMutationArguments,
      ctx: TContext
    ): Promise<string> {
      const [newChannelResp] = await pg('channels').insert(
        {
          name: channelName,
          owner: pg('users')
            .select('id')
            .where({ google_id: ctx.user.sub })
        },
        'id'
      )

      return toBase26(newChannelResp)
    },
    async channelJoin(_, { input: { channelId } }: GQL.IChannelJoinOnMutationArguments) {
      const channelIdAsNumber = fromBase26(channelId)
      const [resp] = await pg('channels')
        .select()
        .where({ id: channelIdAsNumber })
      return resp
    }
  },
  Subscription: {
    trackUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(PUBSUB_CHANNEL),
        (payload, variables) => {
          return payload.trackUpdated.channel.toString() === fromBase26(variables.input.channel).toString()
        }
      )
    },
    playerControl: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(PUBSUB_PLAYER),
        (payload, variables) => {
          console.log('PLAYER CONTROL PUBSUB', { payload, variables })
          return payload.channel.toString() === fromBase26(variables.input.channel).toString()
        }
      )
    }
  }
}

const { schema: ytSchema, resolvers: ytResolvers } = gapiToGraphQL({ gapiAsJsonSchema: YouTubeAPI })

const schema1 = makeExecutableSchema({
  typeDefs: gql`
    ${ytSchema}
  `,
  resolvers: ytResolvers
})

const schema2 = makeExecutableSchema({
  typeDefs: handSchema,
  resolvers: resolvers
})

const newschema = mergeSchemas({
  schemas: [schema1, schema2]
})

export { newschema as schema }
