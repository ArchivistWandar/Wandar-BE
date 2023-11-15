import client from "../../client.js";
import { PENDING, protectedResolver } from "../users.utils.js";

export default {
  Query: {
    seeFriendRequest: protectedResolver(
      async (_, __, { loggedInUser }) => {
        const requests = await client.friendRequest.findMany({
          where: {
            recieverId: loggedInUser.id,
            status: PENDING
          },
          include: {
            requestSender: { select: { username: true } },
          }
        })
        console.log(requests)
        return requests
      }
    )
  }
}