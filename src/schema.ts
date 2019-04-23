import { gql, withFilter } from 'apollo-server'
import gapiToGraphQL from 'gapi-to-graphql'
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import { makeExecutableSchema, mergeSchemas, IResolvers } from 'graphql-tools'
import { PubSub } from 'graphql-subscriptions'
import { TContext } from '../global'
import { pg, upsert } from './knex'
import { fromBase26, toBase26 } from './Base26'
import IMarkTrackAsPlayedOnMutationArguments = GQL.IMarkTrackAsPlayedOnMutationArguments

const PUBSUB_CHANNEL = 'VIDEO_ADDED'

export const pubsub = new PubSub()

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

  input ChannelJoinInput{
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
    playing, played, upcoming
  }

  type Track {
    id: ID
    videoId: ID
    title: String
    owner: User
    channel: Channel
    addedOn: String
    state: TrackState
  }


  type Channel {
    id:ID
    createdOn:String
    track: Track
    name:String
    owner:User
    tracks (first: Int, after: ID, played: Boolean):Tracks
    nowPlaying:Track
  }

  type Query {
    channel (id: ID!):Channel

  }

  input MarkTrakAsPlayedInput {
    track:ID!
    nextTrack:ID
  }

  type Mutation {
    channelCreate(input: ChannelCreateInput!): ID
    videoPush(input: VideoPushInput!): Track
    authenticate:ID

    markTrackAsPlayed(input:MarkTrakAsPlayedInput!): ID
    channelJoin(input:ChannelJoinInput!):Channel
  }

  input TrackUpdatedInput {
    channel:ID
  }

  type Subscription {
    trackUpdated(input:TrackUpdatedInput!): Track
  }
`


const resolvers = {
  User: {
    // todo: when needed, wrap email behind security
    email: () => null,
    googleId: () => null,
    emailVerified: () => null,
    fullName: ({ first_name, last_name }) => `${first_name} ${last_name}`,
    firstName: ({ first_name }) => first_name,
    lastName: ({ last_name }) => last_name
  },
  Track: {
    owner: (parent, _, ctx: TContext) => ctx.loaders.users.load(parent.owner),
    videoId: ({ video_id }) => video_id,
    state: ({ played }) => {
      if (played === true) {
        return 'played'
      } else if (played === false) {
        return 'upcoming'
      } else if (played === 'now') {
        return 'playing'
      }
    }
  },
  Query: {
    channel: async (_, { id }, ctx) => {
      const dbId = fromBase26(id)
      const [channelRow] = await pg('channels').select('*').where({ id: dbId })

      const channelObj = { ...channelRow, id, dbId }

      if (channelObj.now_playing) {
        // on song insert it can set now playing

      } else {
        const [nowPlaying] = await pg('tracks').select('*').where({
          channel: dbId,
          played: false
        }).orderBy('added_on', 'asc').limit(1)


        channelObj.__nowPlaying = nowPlaying

        if (nowPlaying) {
          const updatedOnTable = await pg('channels').update({ now_playing: nowPlaying.id }).where({ id: dbId })
          console.log('Updated now playying on channel')
        }
      }

      return channelObj

    }
  },
  Channel: {
    createdOn: () => 'CREATED ONNN',
    owner: (parent, _, ctx: TContext) => ctx.loaders.users.load(parent.owner),

    tracks: async (parent, { first, after, played }, ctx) => {

      const whereClause: { channel: string, played?: boolean } = { channel: parent.dbId }

      if (played !== undefined) {
        whereClause.played = played
      }

      const tracks = await pg('tracks').select('*').where(function() {
        this.where(whereClause).andWhere((function() {
          if (played === false) {
            this.where('tracks.id', '!=', parent.now_playing)
          }
        }))

      }).orderBy('added_on', 'asc')

      const edges = tracks.map(track => ({
        cursor: track.id,
        node: { ...track, played: track.id === parent.now_playing ? 'now' : track.played }
      }))

      return { totalCount: tracks.length, edges }
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
        return { ...tReturn, played: 'now' }
      }


    }
  },
  Mutation: {
    markTrackAsPlayed: async (parent, args: IMarkTrackAsPlayedOnMutationArguments, ctx: TContext) => {

      const { nextTrack, track } = args.input
      // get track // get channel from track // see if channel is owned by tgit a
      // query makes sure that only the owner of the channel can mark the track as played

      const channelOwnerQuery = pg('users').select('id').where({ google_id: ctx.user.sub })

      const channelsOwner = pg('channels').select('id').where({
        id: pg.raw('tracks.channel'),
        owner: channelOwnerQuery
      })


      const updateQuery = pg('tracks').update({ played: true }).where({
        id: track,
        channel: channelsOwner
      }).returning('*')
      
      const [updateResp] = await updateQuery

      if (updateResp) {
        const updateChannelResp = await pg('channels').update({ now_playing: nextTrack || null }).where({ id: updateResp.channel }).returning('*')
      } else {
        // set now playing on channel
        throw 'Unable to mark track as played, please make sure your viewing the right party under the right Google Account'

      }

      //console.log('UPDATED TRACK ', updateResp[0])
      //  pubsub.publish(PUBSUB_CHANNEL, { trackUpdated: updateResp[0] })

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
        table: 'users', object: {
          google_id,
          email,
          email_verified,
          picture,
          first_name,
          last_name,
          locale
        }, key: 'google_id'
      })

      return upsertResponse.id
    },
    async videoPush(_, { input: { channel, videoId, title } }
      :
      GQL.IVideoPushOnMutationArguments, ctx
                      :
                      TContext
    ) {

      const [videoAddedResponse] = await pg('tracks').insert({
        channel: fromBase26(channel),
        video_id: videoId,
        title,
        owner: pg('users').select('id').where({ google_id: ctx.user.sub })
      }).returning('*')

      videoAddedResponse.channel = channel
      pubsub.publish(PUBSUB_CHANNEL, { trackUpdated: videoAddedResponse })

      return videoAddedResponse
    }
    ,
    async channelCreate(_, { input: { channelName } }
      :
      GQL.IChannelCreateOnMutationArguments, ctx
                          :
                          TContext
    ):
      Promise<string> {
      const [newChannelResp] = await pg('channels').insert({
        name: channelName,
        owner: pg('users').select('id').where({ google_id: ctx.user.sub })
      }, 'id')

      return toBase26(newChannelResp)
    },
    async channelJoin(_, { input: { channelId } }
      :
      GQL.IChannelJoinOnMutationArguments
    ) {
      const channelIdAsNumber = fromBase26(channelId)
      const [resp] = await pg('channels').select().where({ id: channelIdAsNumber })
      return resp
    }
  },

  Subscription: {
    trackUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(PUBSUB_CHANNEL),
        (payload, variables) => {

          console.log('subscribe', { payload, variables })
          return payload.trackUpdated.channel === variables.input.channel
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
