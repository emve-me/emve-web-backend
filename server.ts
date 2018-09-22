import { ApolloServer, gql } from 'apollo-server'
import gapiToGraphQL from 'gapi-to-graphql'
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import { makeExecutableSchema, addMockFunctionsToSchema, mergeSchemas } from 'graphql-tools'

const { schema, resolvers } = gapiToGraphQL({ gapiAsJsonSchema: YouTubeAPI })

const handschema = gql`
  schema {
    mutation: Mutation
    query: Query
  }

  type Query {
    hello: String
  }
  type Mutation {
    channelCreate: Int
    videoPush: Int
  }
`

const xRes = {
  Mutation: {
    videoPush: () => 444434433
  }
}

const schema1 = makeExecutableSchema({
  typeDefs: gql`
    ${schema}
  `,
  resolvers
})

const schema2 = makeExecutableSchema({
  typeDefs: handschema,
  resolvers: xRes
})

const newschema = mergeSchemas({
  schemas: [schema2, schema1]
})

const server = new ApolloServer({
  schema: newschema
})

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀    Server ready at ${url}`)
  })
  .catch(err => console.log(err))
