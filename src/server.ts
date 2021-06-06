import { ApolloServer } from 'apollo-server'
import { schema } from './schema/schema'
import { GraphQLError } from 'graphql'
import { context } from './context'

const { NODE_ENV, PORT } = process.env

const isProd = NODE_ENV === 'production'

const server = new ApolloServer({
  schema,
  cors: true,
  formatError: error => {
    console.error(error)

    return new GraphQLError('GraphQL Error')
  },
  introspection: !isProd,
  playground: isProd
    ? false
    : {
        settings: {
          'general.betaUpdates': false,
          'editor.fontSize': 14,
          'editor.fontFamily': "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
          'editor.theme': 'light',
          'editor.reuseHeaders': true,
          'request.credentials': 'omit',
          'tracing.hideTracingResponse': true
        }
      },
  context
})

server
  .listen({ port: PORT })
  .then(({ url, subscriptionsUrl }) => {
    console.log(`🚀Server ready at ${url}`)
    console.log(`WS ready at ${subscriptionsUrl}`)
  })
  .catch(err => console.log(err))
