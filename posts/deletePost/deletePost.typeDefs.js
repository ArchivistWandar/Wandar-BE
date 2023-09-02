const typeDefs = `#graphql

  type Mutation {
    deletePost(id: Int!): MutationResponse!
  }

`
export default typeDefs