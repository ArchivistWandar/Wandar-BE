const typeDefs = `#graphql

  type sendFriendRequestResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    sendFriendRequest(username: String!): sendFriendRequestResult
  }
`;

export default typeDefs;
