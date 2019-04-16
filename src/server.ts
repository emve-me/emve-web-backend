import { ApolloServer, gql } from 'apollo-server'
import { schema } from './schema'
import { now } from './knex'

const server = new ApolloServer({ schema, cors: true })

server
  .listen()
  .then(({ url, subscriptionsUrl }) => {
    console.log(`🚀    Server ready at ${url}`)
    console.log(`🚀    WS ready at ${subscriptionsUrl}`)

  })
  .catch(err => console.log(err))

;(async () => {
  console.log('It\'s now', await now())
})()
