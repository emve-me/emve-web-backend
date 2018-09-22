import { gql } from 'apollo-server'
import gapiToGraphQL from 'gapi-to-graphql'
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import { makeExecutableSchema, addMockFunctionsToSchema, mergeSchemas, IResolvers } from 'graphql-tools'
import { PubSub } from 'graphql-subscriptions'

export const pubsub = new PubSub()

const videos: Array<IVideoPushInput> = []

const { schema, resolvers } = gapiToGraphQL({ gapiAsJsonSchema: YouTubeAPI })

const handSchema = gql`
  schema {
    mutation: Mutation
    subscription: Subscription
  }

  input VideoPushInput {
    videoId: ID
    channel: ID
  }

  input ChannelCreateInput {
    channelName: String
  }

  type Mutation {
    channelCreate(input: ChannelCreateInput): Int
    videoPush(input: VideoPushInput): ID
  }

  type Subscription {
    videoPushed: ID
  }
`

interface IVideoPushInput {
  videoId: String
  channel: String
}

interface INoop {}

const handResolvers = {
  Mutation: {
    videoPush(_, { videoId, channel }) {
      console.log('pushing videroddddopokkkkkkkkkkkkkoppo of ', videoId, channel)
      videos.push({ videoId, channel })
    }
  },
  Subscription: {
    commentAdded: {
      resolve: payload => {
        return {
          customData: payload
        }
      },
      subscribe: () => pubsub.asyncIterator('commentAdded')
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
