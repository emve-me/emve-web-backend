module.exports = {
  client: {
  clientSchemaDirectives: ["client"],

    service: {
      includes: ['src/**/*.tsx', 'src/**/*.ts'], // array of glob patterns
      tagName: 'gql',
      name: 'emve_api',
      url: 'http://localhost:4000'
    }
  }
}
