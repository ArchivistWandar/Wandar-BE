const typeDefs = `#graphql
  type Query {
    getPost(id: Int!):Post
  }
`
export default typeDefs