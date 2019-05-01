import { ApolloServer } from 'apollo-server'
import { schema } from './schema/schema'
import { pg } from './db'
import DataLoader from 'dataloader'
import { TUser } from '../global'
import { OAuth2Client } from 'google-auth-library'
import { GraphQLError } from 'graphql'

const { OAUTH_CLIENT_ID, NODE_ENV, PORT } = process.env

const client = new OAuth2Client(OAUTH_CLIENT_ID)

async function verify(token): Promise<TUser> {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: OAUTH_CLIENT_ID as string
  })
  return ticket.getPayload() as TUser
}

const IS_PRODUCTION = NODE_ENV === 'production'

const getUsers = async keys =>
  await pg('users')
    .select('*')
    .whereIn('id', keys)

// join the channel owner here expose to resolver
const getTracks = async keys =>
  await pg('tracks')
    .select('*')
    .whereIn('id', keys)

function createLoaders({ user }: { user? }) {
  return {
    users: new DataLoader<number, any>(keys => getUsers(keys)),
    tracks: new DataLoader<number, any>(keys => getTracks(keys))
  }
}

const server = new ApolloServer({
  schema,
  cors: true,
  formatError: error => {
    console.error(error)
    return new GraphQLError('GraphQL Error')
  },
  introspection: !IS_PRODUCTION,
  playground: IS_PRODUCTION
    ? false
    : {
        settings: {
          'general.betaUpdates': false,
          'editor.cursorShape': 'line',
          'editor.fontSize': 14,
          'editor.fontFamily': "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
          'editor.theme': 'light',
          'editor.reuseHeaders': true,
          'prettier.printWidth': 80,
          'request.credentials': 'omit',
          'tracing.hideTracingResponse': true
        }
      },
  context: async ({ req, res, connection }: { req; res; connection? }) => {
    if (connection) {
      // Use this to authenticate context, connection.context
      return { loaders: createLoaders({}) }
    } else if (req) {
      const { authorization } = req.headers

      if (authorization) {
        try {
          const googleIdToken = authorization.replace('Bearer ', '')

          const user = await verify(googleIdToken)

          const loaders = createLoaders({ user })
          user.getDBUser = async () => {
            if (user._dbUser) {
              console.log('returned DB ID FROM CACHE', user._dbUser)
              return user._dbUser
            }

            user._dbUser = (await pg('users')
              .select('*')
              .where({ google_id: user.sub }))[0]

            return user._dbUser
          }

          return { loaders, user }
        } catch (e) {
          console.error('Error creating context', e)
        }
      }
    }

    // unauthenticated
    const loaders = createLoaders({})
    return { loaders }
  }
})

server
  .listen({ port: PORT })
  .then(({ url, subscriptionsUrl }) => {
    console.log(`🚀Server ready at ${url}`)
    console.log(`WS ready at ${subscriptionsUrl}`)
  })
  .catch(err => console.log(err))
