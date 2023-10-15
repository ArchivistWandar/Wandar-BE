const typeDefs = `#graphql

  type Mutation {
    editRecord (
      id: Int!
      title: String,
      photoIds: [Int],
      theme: String
    ): MutationResponse!
  }

`
export default typeDefs