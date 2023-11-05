const typeDefs = `#graphql

  type Mutation {
    editPost(
      id: Int!,
      title: String,
      caption: String,
      landId: Int,
      photos: [Upload],
      isPublic: Boolean
    ): MutationResponse!
  }

`
export default typeDefs