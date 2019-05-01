import { dateResolver } from './dateResolver'
import { TContext } from '../../global'
import { pg } from '../db'
import gql from 'graphql-tag'

export const channelGql = gql`
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

  type Channel {
    id: ID
    createdOn: String
    track: Track
    name: String
    owner: User
    tracks(first: Int, after: ID, played: Boolean): Tracks
    nowPlaying: Track
  }
`

export const Channel = {
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
}
