const typeDefs = `#graphql
  type Query {
    seePhotos(username: String!): [Photo]
  }
`

export default typeDefs