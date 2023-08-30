const typeDefs = `#graphql
  scalar Upload

  type Mutation {
    createPost(
      caption: String!,
      photos: [Upload]!,
      land: String!
    ): Post!
  }

`
export default typeDefs