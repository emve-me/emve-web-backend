import { TContext } from '../../global'
import { fromBase26 } from '../base26'
import { pg } from '../db'
import { gql } from 'apollo-server'

export const queryGql = gql`
  type Query {
    channel(id: ID!): Channel
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
}
