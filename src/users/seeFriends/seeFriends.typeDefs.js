const typeDefs = `#graphql
  type seeFriendsResult {
    ok: Boolean!
    friends: [User]
    totalFriends: Int!
  }
  type Query {
    seeFriends(username: String!): seeFriendsResult!
  }
`;

export default typeDefs;