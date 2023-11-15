const typeDefs = `#graphql
  type Query {
    duplicateVerifyUsername(username: String!): Boolean!
  }
`
export default typeDefs