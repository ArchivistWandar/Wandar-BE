const typeDefs = `#graphql

  type Mutation {
    editRecord (
      id: Int!
      title: String,
      photos: [Upload],
      theme: String
      isPublic: Boolean
    ): MutationResponse!
  }

`
export default typeDefs