const typeDefs = `#graphql

  type Mutation {
    createRecord (
      title: String!,
      photoIds: [Int!]!
      theme: String!
      isPublic: Boolean!
    ): MutationResponse!
  }

`
export default typeDefs