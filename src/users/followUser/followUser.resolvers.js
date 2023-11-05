import client from "../../client.js";
import { protectedResolver } from "../users.utils.js";

export default {
  Mutation: {
    followUser: protectedResolver(
      async (_, { username }, { loggedInUser }) => {

        const ok = await client.user.findUnique({ where: { username } })
        if (!ok){
          return {
            ok: false,
            error: "존재하지 않는 사용자입니다."
          }
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: {
                username,
              }
            }
          }
        })
        return {
          ok: true,
        }
      }

    )
  }
}