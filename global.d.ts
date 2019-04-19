import DataLoader from 'dataloader'

export type TContext = {
  loaders: { users: DataLoader<number, any> }
  user: {
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
  }
}
