import { pg } from './db'
import DataLoader from 'dataloader'
import { verifyToken } from './verifyToken'

const getUsers = async keys =>
  await pg('users')
    .select('*')
    .whereIn('id', keys)

// join the channel owner here expose to resolver
const getTracks = async keys =>
  await pg('tracks')
    .select('*')
    .whereIn('id', keys)

export function createLoaders({ user }: { user? }) {
  return {
    users: new DataLoader<number, any>(keys => getUsers(keys)),
    tracks: new DataLoader<number, any>(keys => getTracks(keys))
  }
}
export const context = async ({ req, res, connection }: { req; res; connection? }) => {
  if (connection) {
    return { loaders: createLoaders({}) }
  } else if (req) {
    const { authorization } = req.headers

    if (authorization) {
      try {
        const googleIdToken = authorization.replace('Bearer ', '')

        const user = await verifyToken(googleIdToken)

        const loaders = createLoaders({ user })
        user.getDBUser = async () => {
          if (user._dbUser) {
            return user._dbUser
          }

          user._dbUser = (
            await pg('users')
              .select('*')
              .where({ google_id: user.sub })
          )[0]

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
