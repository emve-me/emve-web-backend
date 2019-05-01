import gapiToGraphQL from 'gapi-to-graphql'
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools'
import { mutationGql, Mutation } from './mutation'
import { queryGql, Query } from './query'
import { subscriptionGql, Subscription } from './Subscription'
import { Channel, channelGql } from './channel'
import { trackGql, Track } from './track'
import { userGql, User } from './user'
import gql from 'graphql-tag'

const schemaGql = gql`
  schema {
    mutation: Mutation
    subscription: Subscription
    query: Query
  }
`
const { schema: ytSchema, resolvers: ytResolvers } = gapiToGraphQL({ gapiAsJsonSchema: YouTubeAPI })

const youTubeSchema = makeExecutableSchema({
  typeDefs: gql`
    ${ytSchema}
  `,
  resolvers: ytResolvers
})

const emveSchema = makeExecutableSchema({
  typeDefs: [mutationGql, queryGql, schemaGql, subscriptionGql, channelGql, trackGql, userGql],
  resolvers: { Mutation, Query, Subscription, Channel, Track, User }
})

const schema = mergeSchemas({
  schemas: [youTubeSchema, emveSchema]
})

export { schema }
