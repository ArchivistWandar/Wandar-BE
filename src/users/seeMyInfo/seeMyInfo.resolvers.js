import client from "../../client.js";
import { protectedResolver } from "../users.utils.js";

export default {
  Query: {
    seeMyInfo: protectedResolver(
      async (_, __, { loggedInUser }) => {
        const myInfo = await client.user.findUnique({
          where: {
            id: loggedInUser.id
          },
          select: {
            username: true,
          }
        })

        return myInfo
      }
    )
  }
}