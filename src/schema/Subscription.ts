import { withFilter } from 'graphql-subscriptions'
import { pubsub } from '../db'
import { fromBase26 } from '../base26'
import { gql } from 'apollo-server'

export const PUBSUB_CHANNEL = 'VIDEO_ADDED'
export const PUBSUB_PLAYER = 'PLAYER_CONTROL'

export const subscriptionGql = gql`
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

export const Subscription = {
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
