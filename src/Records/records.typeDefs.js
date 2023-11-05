const typeDefs = `#graphql
  type Record {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    title: String!
    photos: [Photo!]
    theme: String!
    isPublic: Boolean!
    isMine: Boolean!
    lands: [Land]
  }
`
export default typeDefs