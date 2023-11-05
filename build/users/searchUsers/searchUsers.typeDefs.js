const typeDefs = "#graphql\n  type Query {\n    searchUsers(keyword: String!, lastId: Int): [User]\n  }\n";
export default typeDefs;