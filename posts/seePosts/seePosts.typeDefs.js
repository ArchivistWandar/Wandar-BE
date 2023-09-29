const typeDefs = `#graphql
  type Query {
    seePosts(userId: Int!):[Post]
  }
`
export default typeDefs