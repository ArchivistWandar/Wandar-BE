import client from "../client.js"
import { ACCEPTED } from "./users.utils.js"


export default {
  User: {

    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      return id === loggedInUser.id
    },
    isFriend: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      // const exists = await client.user.findUnique({ where: { username: loggedInUser.username } })
      //   .following({ where: { id } })

      const exists = await client.user.count({
        where: {
          OR: [
            { requestRecieved: { some: { recieverId: loggedInUser.id, senderId: id, status: ACCEPTED }, } },
            { requestSent: { some: { recieverId: id, senderId: loggedInUser.id, status: ACCEPTED } } }
          ]
        },
      })

      return Boolean(exists)

    },
    friends: ({ id }) => client.user.findMany({
      where: {
        OR: [
          { requestRecieved: { some: { senderId: id, status: ACCEPTED }, } },
          { requestSent: { some: { recieverId: id, status: ACCEPTED } } }
        ]
      },
    }),

    totalFriends: ({ id }) => {
      
      return client.user.count({
        where: {
          OR: [
            { requestRecieved: { some: { senderId: id, status: ACCEPTED }, } },
            { requestSent: { some: { recieverId: id, status: ACCEPTED } } }
          ]
        },
      })
    },
    requestSent: ({ id }) => client.friendRequest.findMany({ where: { senderId: id } }),
    requestRecieved: ({ id }) => client.friendRequest.findMany({ where: { recieverIdId: id } }),
    photos: ({ id }) => client.photo.findMany({ where: { userId: id } }),
    posts: ({ id }) => client.post.findMany({ where: { userId: id, isPublic: true } }),
    records: ({ id }) => client.record.findMany({ where: { userId: id, isPublic: true } }),
    lands: ({ id }) => client.land.findMany({ where: { userId: id } }),
    lastUpdate: async ({ id }) => {
      const latestPost = await client.post.findFirst({
        where: { userId: id },
        orderBy: { createdAt: 'desc' },
      })

      // console.log(latestPost ? latestPost.createdAt : null)
      return latestPost ? latestPost.createdAt : null;
    }

  },
  FriendRequest: {
    requestSender: ({ id }) => client.user.findFirst({ where: { requestSent: { some: { id } } }, }),
    requestReciever: ({ id }) => client.user.findFirst({ where: { requestRecieved: { some: { id } } }, })
  }
}