const typeDefs = `#graphql
  type deleteFriendResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    deleteFriend(username: String!): deleteFriendResult
  }

`
export default typeDefs;