const typeDefs = `#graphql

  type acceptOrDeclineFriendRequestResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    acceptOrDeclineFriendRequest(username: String!, isAccepting: Boolean!): acceptOrDeclineFriendRequestResult
  }
`;

export default typeDefs;