const typeDefs = `#graphql
  type Query {
    getRecord(id: Int!):Record
  }
`
export default typeDefs