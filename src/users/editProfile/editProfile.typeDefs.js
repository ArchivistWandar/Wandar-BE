const typeDefs = `#graphql
  scalar Upload
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      username: String
      email: String
      password: String
      avatar: Upload
    ): EditProfileResult!
  }
`;

export default typeDefs;