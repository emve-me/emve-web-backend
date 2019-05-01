import gql from 'graphql-tag'
import { dateResolver } from './dateResolver'

export const userGql = gql`
  type User {
    id: ID
    googleId: ID
    email: String
    emailVerified: Boolean
    picture: String
    fullName: String
    firstName: String
    lastName: String
    locale: String
    createdOn: String
  }
`

export const User = {
  createdOn: ({ createdOn }) => dateResolver(createdOn),
  // todo: when needed, wrap email behind security
  email: () => null,
  googleId: () => null,
  emailVerified: () => null,
  fullName: ({ first_name, last_name }) => `${first_name} ${last_name}`,
  firstName: ({ first_name }) => first_name,
  lastName: ({ last_name }) => last_name
}
