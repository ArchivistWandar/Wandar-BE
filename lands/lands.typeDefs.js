const typeDefs = `#graphql
  type Land {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    post: [Post]
    photos: [Photo]
    landname: String!
    location: String!


  }
`

export default typeDefs