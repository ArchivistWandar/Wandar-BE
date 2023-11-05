const typeDefs = `#graphql
  type Query {
    seeLand(userId: Int!):[Land]
  }
`
export default typeDefs