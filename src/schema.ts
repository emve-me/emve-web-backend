import { gql, withFilter } from 'apollo-server'
import gapiToGraphQL from 'gapi-to-graphql'
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import { makeExecutableSchema, mergeSchemas, IResolvers } from 'graphql-tools'
import { PubSub } from 'graphql-subscriptions'
import { TContext } from '../global'
import { pg, upsert } from './knex'
import { fromBase26, toBase26 } from './Base26'

export const pubsub = new PubSub()

const handSchema = gql`
  schema {
    mutation: Mutation
    subscription: Subscription
    query: Query
  }

  input VideoPushInput {
    videoId: ID!
    channel: ID!
    title: String
    time: Int
  }

  type Video {
    id: ID
  }

  input ChannelCreateInput {
    channelName: String
  }

  input ChannelJoinInput{
    channelId: ID!
  }

  type User {
    id: ID
    google_id: ID
    email: String
    email_verified: Boolean
    picture: String
    fullName: String
    firstName: String
    lastName: String
    locale: String
    created_on: String
  }

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

  type Track {
    id: ID
    video_id: ID
    title: String
    owner: User
    channel: Channel
    addedOn: String
    played: Boolean
  }


  type Channel {
    id:ID
    createdOn:String
    name:String
    owner:User
    tracks (first: Int, after: ID ):Tracks
  }
  
  type Query {
    videos: [ID]
  }

  type Mutation {
    channelCreate(input: ChannelCreateInput!): ID
    videoPush(input: VideoPushInput!): ID
    authenticate:ID
    channelJoin(input:ChannelJoinInput!):Channel
  }

  input VideoPushedInput {
    channel:ID
  }

  type Subscription {
    videoPushed(input:VideoPushedInput!): Video
  }
`


const resolvers = {
  Channel: {
    createdOn: () => 'CREATED ONNN'


  },
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
    async videoPush(_, { input: { channel, videoId, title } }: GQL.IVideoPushOnMutationArguments, ctx: TContext) {

      const videoAddedResponse = await pg('tracks').insert({
        channel: fromBase26(channel),
        video_id: videoId,
        title,
        owner: pg('users').select('id').where({ google_id: ctx.user.sub })
      })

      console.log(videoAddedResponse)

      pubsub.publish('VIDEO_ADDED', { videoPushed: { id: videoId, channel } })

      return ''
    },
    async channelCreate(_, { input: { channelName } }: GQL.IChannelCreateOnMutationArguments, ctx: TContext): Promise<string> {
      const [newChannelResp] = await pg('channels').insert({
        name: channelName,
        owner: pg('users').select('id').where({ google_id: ctx.user.sub })
      }, 'id')

      return toBase26(newChannelResp)
    },
    async channelJoin(_, { input: { channelId } }: GQL.IChannelJoinOnMutationArguments) {
      const channelIdAsNumber = fromBase26(channelId)
      const [resp] = await pg('channels').select().where({ id: channelIdAsNumber })
      return resp
    }
  },

  Subscription: {
    videoPushed: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('VIDEO_ADDED'),
        (payload, variables) => {
          return payload.videoPushed.channel === variables.input.channel
        }
      )
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
  schemas: [schema1, schema2]

})

export { newschema as schema }
