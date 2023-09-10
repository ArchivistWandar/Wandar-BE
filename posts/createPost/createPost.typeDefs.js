const typeDefs = `#graphql
  scalar Upload

  type Mutation {
    createPost(
      caption: String!,
      photos: [Upload]!,
      landId: Int!
    ): MutationResponse!
  }

`
export default typeDefs