const typeDefs = `#graphql
  type Post {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    hashtags: [Hashtag]
    caption: String!
    land: Land!
    photos: [Photo]!
    isMine: Boolean!
    isPublic: Boolean!
    isPublished: Boolean!
  }

  type Photo {
    id: Int!
    createdAt: String!
    updatedAt: String!
    photo: String!
    location: String!
    user: User!
    post: Post!
    land: Land!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    posts: [Post]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }

`;

export default typeDefs;