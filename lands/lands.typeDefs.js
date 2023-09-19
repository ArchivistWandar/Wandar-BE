const typeDefs = `#graphql
  type Land {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    post: [Post]
    landname: String!
    location: String!


  }
`

export default typeDefs