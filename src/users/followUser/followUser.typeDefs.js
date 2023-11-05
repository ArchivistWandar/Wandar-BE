const typeDefs = `#graphql

  type FollowUserResult{
    ok: Boolean!
    error: String
  }
  type Mutation {
    followUser(username: String!): FollowUserResult
  }
`;

export default typeDefs;
