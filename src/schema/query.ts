import { TContext } from '../../global'
import { fromBase26 } from '../base26'
import { pg } from '../db'
import { gql } from 'apollo-server'

export const queryGql = gql`
  input ChannelQuery {
    id: ID!
    played: Boolean
  }

  type Query {
    channel(input: ChannelQuery!): Channel
    loggedInUser: User
  }
`

export const Query = {
  loggedInUser: async (_, __, ctx: TContext) => {
    if (!ctx.user) {
      return null
    }

    return await ctx.user.getDBUser()
  },
  channel: async (_, { input: { id, played = false } }, ctx) => {
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
          played
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
}
