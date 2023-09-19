const typeDefs = `#graphql
  type Mutation {
    editLand(
      id: Int!
      landname: String
    ): MutationResponse!
  }

`

export default typeDefs