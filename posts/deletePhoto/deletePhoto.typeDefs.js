const typeDefs = `#graphql

  type Mutation {
    deletePhoto(id: Int!): MutationResponse!
  }

`
export default typeDefs