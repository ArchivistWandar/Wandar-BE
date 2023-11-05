const typeDefs = `#graphql
  type Query {
    seePhotos(userId: Int!): [Photo]
  }
`

export default typeDefs