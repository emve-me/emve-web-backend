import { OAuth2Client } from 'google-auth-library'
import { TUser } from '../global'
import jwt from 'jsonwebtoken'

const { OAUTH_CLIENT_ID } = process.env

const client = new OAuth2Client(OAUTH_CLIENT_ID)

export async function verifyToken(token): Promise<TUser> {
  return jwt.decode(token) as TUser

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: OAUTH_CLIENT_ID as string
  })
  return ticket.getPayload() as TUser
}
