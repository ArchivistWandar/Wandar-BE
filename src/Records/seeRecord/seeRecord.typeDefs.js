const typeDefs = `#graphql
  type Query {
    seeRecord(userId: Int!):[Record]
  }
`
export default typeDefs