import { gql } from 'apollo-server'
import gapiToGraphQL from 'gapi-to-graphql'
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import { makeExecutableSchema, mergeSchemas, IResolvers } from 'graphql-tools'
import { PubSub } from 'graphql-subscriptions'

export const pubsub = new PubSub()

const videos: Array<IVideoPushInput> = []

const { schema, resolvers } = gapiToGraphQL({ gapiAsJsonSchema: YouTubeAPI })

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
  }

  type Subscription {
    videoPushed: Video
  }
`

interface IVideoPushInput {
  videoId: String
  channel: String
}

const handResolvers = {
  Mutation: {
    videoPush(_, { input: { videoId, channel } }) {
      videos.push({ videoId, channel })
      pubsub.publish('VIDEO_ADDED', { videoPushed: { id: videoId } })
      return videoId
    }
  },
  Subscription: {
    videoPushed: {
      subscribe: () => pubsub.asyncIterator('VIDEO_ADDED')
    }
  }
}

const schema1 = makeExecutableSchema({
  typeDefs: gql`
    ${schema}
  `,
  resolvers
})

interface Context {}

const schema2 = makeExecutableSchema<Context>({
  typeDefs: handSchema,
  resolvers: handResolvers as IResolvers<any, Context>
})

const newschema = mergeSchemas({
  schemas: [schema2, schema1]
})

export { newschema as schema }
