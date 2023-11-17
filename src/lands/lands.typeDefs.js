const typeDefs = `#graphql
  type Land {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    posts: [Post]
    photos: [Photo]
    landname: String!
    composition: String
    isMine: Boolean!
    lastUpdate: String

  }
`

export default typeDefs