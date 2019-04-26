import { ApolloServer, gql } from 'apollo-server'
import { schema } from './schema'
import { now, pg } from './knex'
import jwt from 'jsonwebtoken'
import DataLoader from 'dataloader'

const IS_PRODUCTION = process.env.PORT === 'production'

const getUsers = async (keys) => await pg('users').select('*').whereIn('id', keys)

const getTracks = async (keys) => await pg('tracks').select('*').whereIn('id', keys)

function createLoaders({ user }: { user? }) {
  return {
    users: new DataLoader<number, any>(keys => getUsers(keys)),
    tracks: new DataLoader<number, any>(keys => getTracks(keys))
  }
}

const server = new ApolloServer({
  schema, cors: true,

  formatError: (error) => {
    console.error(error)
    return error
  },
  introspection: true,
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


      return { loaders: createLoaders({}) }

    } else if (req) {
      const { authorization } = req.headers

      if (authorization) {
        const user = jwt.decode(authorization.replace('Bearer ', ''))
        const loaders = createLoaders({ user })
        return { loaders, user }
      }
    }

    // unauthenticated
    const loaders = createLoaders({})
    return { loaders }
  }
})

const port = process.env.PORT || 4000

server
  .listen({ port })
  .then(({ url, subscriptionsUrl }) => {
    console.log(`🚀    Server ready at ${url}`)
    console.log(`🚀    WS ready at ${subscriptionsUrl}`)
  })
  .catch(err => console.log(err))