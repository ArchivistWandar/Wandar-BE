const typeDefs = `#graphql

  type Mutation {
    editRecord (
      id: Int!
      title: String,
      photoIds: [Int],
      theme: String
      isPublic: Boolean
    ): MutationResponse!
  }

`
export default typeDefs