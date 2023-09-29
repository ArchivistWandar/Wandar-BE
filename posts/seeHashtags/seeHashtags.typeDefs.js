const typeDefs = `#graphql
  type Query {
    seeHashtags(hashtag: String!): Hashtag
  }
`

export default typeDefs