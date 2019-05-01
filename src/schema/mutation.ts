import gql from 'graphql-tag'
import { TContext } from '../../global'
import { pg, pubsub, upsert } from '../db'
import { fromBase26, toBase26 } from '../base26'
import IRemoveTrackOnMutationArguments = GQL.IRemoveTrackOnMutationArguments
import IMarkTrackAsPlayedOnMutationArguments = GQL.IMarkTrackAsPlayedOnMutationArguments
import { PUBSUB_CHANNEL, PUBSUB_PLAYER } from './Subscription'

export const mutationGql = gql`
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

  input MarkTrakAsPlayedInput {
    track: ID!
    nextTrack: ID
  }

  input RemoveTrackInput {
    track: ID!
  }

  input TrackUpdatedInput {
    channel: ID
  }

  input PlayerControlInput {
    channel: ID
  }

  type Mutation {
    channelCreate(input: ChannelCreateInput!): ID
    videoPush(input: VideoPushInput!): Track
    authenticate: User
    removeTrack(input: RemoveTrackInput!): ID
    markTrackAsPlayed(input: MarkTrakAsPlayedInput!): ID
    channelJoin(input: ChannelJoinInput!): Channel
  }
`

export const Mutation = {
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
}
