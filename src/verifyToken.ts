import { OAuth2Client } from 'google-auth-library'
import { TUser } from '../global'

const { OAUTH_CLIENT_ID } = process.env

const client = new OAuth2Client(OAUTH_CLIENT_ID)

export async function verifyToken(token): Promise<TUser> {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: OAUTH_CLIENT_ID as string
  })
  return ticket.getPayload() as TUser
}
