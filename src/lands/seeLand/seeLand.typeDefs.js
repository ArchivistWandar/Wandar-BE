const typeDefs = `#graphql
  type Query {
    seeLand(username: String!):[Land]
  }
`
export default typeDefs