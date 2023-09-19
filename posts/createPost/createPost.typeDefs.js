const typeDefs = `#graphql
  scalar Upload

  type Mutation {
    createPost(
      caption: String!,
      photos: [Upload]!,
      landId: Int!,
      isPublic: Boolean!
    ): MutationResponse!
  }

`
export default typeDefs