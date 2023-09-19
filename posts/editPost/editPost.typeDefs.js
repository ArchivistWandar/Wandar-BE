const typeDefs = `#graphql

  type Mutation {
    editPost(
      id: Int!,
      caption: String,
      land: String,
      photos: [Upload]
    ): MutationResponse!
  }

`
export default typeDefs