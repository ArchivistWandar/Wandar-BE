const typeDefs = `#graphql
  type Query {
    seeRecord(username: String!):[Record]
  }
`
export default typeDefs