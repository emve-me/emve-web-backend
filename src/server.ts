import { ApolloServer, gql } from 'apollo-server'
import { schema } from './schema'

const server = new ApolloServer({ schema, cors: true })

server
  .listen()
  .then(({ url, subscriptionsUrl }) => {
    console.log(`🚀    Server ready at ${url}`)
    console.log(`🚀    WS ready at ${subscriptionsUrl}`)
  })
  .catch(err => console.log(err))
