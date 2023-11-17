const typeDefs = `#graphql
  type Query {
    seePosts(username: String!):[Post]
  }
`
export default typeDefs