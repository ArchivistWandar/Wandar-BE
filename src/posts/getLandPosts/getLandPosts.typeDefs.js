const typeDefs = `#graphql
  type Query {
    getLandPosts(landId: Int!):[Post]
  }
`
export default typeDefs