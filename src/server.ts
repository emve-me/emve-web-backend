import { ApolloServer, gql } from 'apollo-server'
import { schema } from './schema'
import { now } from './knex'
import jwt from 'jsonwebtoken'

const server = new ApolloServer({
  schema, cors: true,

  formatError: (error) => {
    console.error(error)
    return error
  },
  playground: {
    settings: {
      'general.betaUpdates': false,
      'editor.cursorShape': 'line',
      'editor.fontSize': 14,
      'editor.fontFamily': '\'Source Code Pro\', \'Consolas\', \'Inconsolata\', \'Droid Sans Mono\', \'Monaco\', monospace',
      'editor.theme': 'light',
      'editor.reuseHeaders': true,
      'prettier.printWidth': 80,
      'request.credentials': 'omit',
      'tracing.hideTracingResponse': true
    }
  },
  context: async ({ req, res, connection }: { req, res, connection? }) => {

    if (connection) {
      // Use this to authenticate context, connection.context
    } else if (req) {
      const { authorization } = req.headers

      if (authorization) {
        return { user: jwt.decode(authorization.replace('Bearer ', '')) }
      }
    }

    return {}
  }
})

server
  .listen()
  .then(({ url, subscriptionsUrl }) => {
    console.log(`🚀    Server ready at ${url}`)
    console.log(`🚀    WS ready at ${subscriptionsUrl}`)
  })
  .catch(err => console.log(err))