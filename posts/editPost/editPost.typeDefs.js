const typeDefs = `#graphql

  type Mutation {
    editPost(
      id: Int!,
      caption: String,
      land: String
    ): Post!
  }

`
export default typeDefs