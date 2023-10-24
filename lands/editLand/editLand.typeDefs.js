const typeDefs = `#graphql
  type Mutation {
    editLand(
      id: Int!
      landname: String
      composition: String
    ): MutationResponse!
  }

`

export default typeDefs