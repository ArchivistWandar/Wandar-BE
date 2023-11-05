const typeDefs = `#graphql
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
    ): CreateAccountResult
  }
`;

export default typeDefs;