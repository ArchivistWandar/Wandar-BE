const typeDefs = `#graphql
  type User {
    id: Int!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    lastUpdate: String
    bio: String
    avatar: String
    posts: [Post] 
    photos: [Photo]
    records: [Record]
    lands: [Land]
    requestSent: [FriendRequest]
    requestRecieved: [FriendRequest]
    friends: [User]
    totalFriends: Int
    isMe: Boolean!
    isFriend: Boolean!
  }
  type FriendRequest {
    id: Int!
    createdAt: String!
    updatedAt: String!
    status: String!
    requestSender: User!
    requestReciever: User!
  }


`;

export default typeDefs;