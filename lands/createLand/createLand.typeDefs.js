const typeDefs = `#graphql
  type Mutation {
    createLand(
      landname: String!
    ): MutationResponse!
  }

`

export default typeDefs