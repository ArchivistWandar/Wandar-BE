const typeDefs = `#graphql
  scalar Upload

  type Mutation {
    createPost(
      title: String!,
      caption: String!,
      photos: [Upload]!,
      landId: Int!,
      isPublic: Boolean!,
      isPublished: Boolean!
    ): MutationResponse!
  }

`
export default typeDefs