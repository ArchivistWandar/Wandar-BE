const typeDefs = `#graphql
  type Mutation {
    deleteLand (
      id: Int!
    ): MutationResponse!
  }
`
export default typeDefs