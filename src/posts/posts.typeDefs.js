const typeDefs = `#graphql
  type Post {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    hashtags: [Hashtag]
    title: String!
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
    user: User!
    post: Post
    record: Record
    land: Land
    isPublic: Boolean!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    posts: [Post]
    totalPosts: Int!
    createdAt: String!
    updatedAt: String!
  }

`;

export default typeDefs;