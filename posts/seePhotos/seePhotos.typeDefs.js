const typeDefs = `#graphql
  type Query {
    seePhotos(id: Int!): [Photo]
  }
`

export default typeDefs