const typeDefs = `#graphql
  type User {
    id: Int!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    lastUpdate: String!
    bio: String
    avatar: String
    posts: [Post] 
    photos: [Photo]
    lands: [Land]
    following: [User]
    followers: [User]
    totalFollowers: Int!
    totalFollowing: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;

export default typeDefs;