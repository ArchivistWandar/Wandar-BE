const typeDefs = `#graphql

  type Mutation {
    createRecord (
      title: String!,
      photos: [Upload]!,
      theme: String!
      isPublic: Boolean!
    ): MutationResponse!
  }

`
export default typeDefs