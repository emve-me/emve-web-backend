import gapiToGraphQL from 'gapi-to-graphql'
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools'
import { mutationGql, Mutation } from './Mutation'
import { queryGql, Query } from './Query'
import { subscriptionGql, Subscription } from './Subscription'
import { Channel, channelGql } from './Channel'
import { trackGql, Track } from './Track'
import { userGql, User } from './User'
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
