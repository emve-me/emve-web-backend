import { gql } from 'apollo-server'
import gapiToGraphQL from 'gapi-to-graphql'
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import { makeExecutableSchema, mergeSchemas, IResolvers } from 'graphql-tools'
import { PubSub } from 'graphql-subscriptions'
import { TContext } from '../global'
import { pg, upsert } from './knex'
import shortid from 'shortid'
import { toBase26 } from './Base26'

export const pubsub = new PubSub()

const videos = []


const handSchema = gql`
  schema {
    mutation: Mutation
    subscription: Subscription
    query: Query
  }

  input VideoPushInput {
    videoId: ID!
    channel: ID!
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
    channelCreate(input: ChannelCreateInput!): ID
    videoPush(input: VideoPushInput!): ID
    authenticate:ID
  }

  type Subscription {
    videoPushed: Video
  }
`


const resolvers = {
  Mutation: {
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
    videoPush(_, { input: { channel, videoId } }: GQL.IVideoPushOnMutationArguments, ctx: TContext) {

      console.log('video push', ctx)


      //  videos.push({ videoId, channel })
      //  pubsub.publish('VIDEO_ADDED', { videoPushed: { id: videoId } })
      //  return videoId
      return ''
    },
    async channelCreate(_, { input: { channelName } }: GQL.IChannelCreateOnMutationArguments, ctx: TContext): Promise<string> {
      const [newChannelResp] = await pg('channels').insert({
        name: channelName,
        owner: pg('users').select('id').where({ google_id: ctx.user.sub })
      }, 'id')

      return toBase26(newChannelResp)
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
