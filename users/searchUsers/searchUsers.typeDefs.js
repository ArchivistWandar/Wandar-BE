const typeDefs = `#graphql
  type Query {
    searchUsers(keyword: String!, lastId: Int): [User]
  }
`;
export default typeDefs;