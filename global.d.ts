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
  getDBId: () => Promise<string>
}

export type TContext = {
  loaders: {
    users: DataLoader<number, any>
    tracks: DataLoader<number, any>
  }
  user: TUser
}
