import { gql } from 'apollo-server'
import gapiToGraphQL from 'gapi-to-graphql'
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import { makeExecutableSchema, mergeSchemas, IResolvers } from 'graphql-tools'
import { PubSub } from 'graphql-subscriptions'
import { TContext } from '../global'
import { pg } from './knex'

export const pubsub = new PubSub()

const videos: Array<IVideoPushInput> = []


const handSchema = gql`
  schema {
    mutation: Mutation
    subscription: Subscription
    query: Query
  }

  input VideoPushInput {
    videoId: ID
    channel: ID
  }

  type Video {
    id: ID
  }

  input ChannelCreateInput {
    channelName: String
  }

  type Query {
    videos: [ID]
  }

  type Mutation {
    channelCreate(input: ChannelCreateInput): Int
    videoPush(input: VideoPushInput): ID
    authenticate:ID
  }

  type Subscription {
    videoPushed: Video
  }
`

interface IVideoPushInput {
  videoId: String
  channel: String
}

const resolvers = {
  Mutation: {
    authenticate(_, __, ctx: TContext) {
      console.log('USER', ctx.user)
      return 'new user'
    },
    videoPush(_, { input: { videoId, channel } }, ctx: TContext) {
      console.log('video push', ctx)
      videos.push({ videoId, channel })
      pubsub.publish('VIDEO_ADDED', { videoPushed: { id: videoId } })
      return videoId
    },
    channelCreate(_, { input: { channelName } }, ctx: TContext) {

      console.log('creating channel', channelName)
    }
  },
  Subscription: {
    videoPushed: {
      subscribe: () => pubsub.asyncIterator('VIDEO_ADDED')
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
  schemas: [schema2, schema1]
})

export { newschema as schema }
