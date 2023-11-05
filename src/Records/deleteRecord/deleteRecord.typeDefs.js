const typeDefs = `#graphql
  type Mutation {
    deleteRecord(id: Int!): MutationResponse!
  }
`
export default typeDefs