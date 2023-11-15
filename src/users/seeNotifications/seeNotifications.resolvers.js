import client from "../../client.js";
import { ACCEPTED, protectedResolver } from "../users.utils.js";

export default {
  Query: {
    seeNotifications: protectedResolver(
      async (_, __, { loggedInUser }) => {
        const userActivity = await client.user.findMany({
          where: {
            OR: [
              { requestRecieved: { some: { senderId: loggedInUser.id, status: ACCEPTED }, } },
              { requestSent: { some: { recieverId: loggedInUser.id, status: ACCEPTED } } }
            ]
          },
          include: {
            posts: { select: { photos: { select: { photo: true } }, createdAt: true, user: { select: { username: true, avatar: true } } } },
            records: { select: { photos: { select: { photo: true } }, createdAt: true, user: { select: { username: true, avatar: true } } } },
            lands: { select: { landname: true, createdAt: true, user: { select: { username: true, avatar: true } } } }
          }
        })
        return userActivity
      }
    )
  }
}