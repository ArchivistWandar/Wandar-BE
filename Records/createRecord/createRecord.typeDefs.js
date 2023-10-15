const typeDefs = `#graphql

  type Mutation {
    createRecord (
      title: String!,
      photoIds: [Int!]!
      theme: String!
    ): MutationResponse!
  }

`
export default typeDefs