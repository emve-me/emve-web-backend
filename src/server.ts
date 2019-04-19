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