import { dateResolver } from './dateResolver'
import { TContext } from '../../global'
import { gql } from 'apollo-server'

export const trackGql = gql`
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
`
export const Track = {
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
}
