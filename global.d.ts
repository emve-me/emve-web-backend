import DataLoader from 'dataloader'

export type TUser = {
  iss
  azp
  aud
  sub
  email
  email_verified
  at_hash
  name
  picture
  given_name
  family_name
  locale
  iat
  exp
  jti
  _dbUser: any
  getDBUser: () => Promise<any>
}
// todo replace any with strong type

export type TContext = {
  loaders: {
    users: DataLoader<number, any>
    tracks: DataLoader<number, any>
  }
  user: TUser
}
