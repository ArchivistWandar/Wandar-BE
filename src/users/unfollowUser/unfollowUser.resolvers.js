import client from "../../client.js";
import { ACCEPTED, DECLINED, protectedResolver } from "../users.utils.js";

export default {
  Mutation: {
    deleteFriend: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        const user = await client.user.findFirst({
          where: {
            username, OR: [
              { requestRecieved: { some: { senderId: loggedInUser.id } } },
              { requestSent: { some: { recieverId: loggedInUser.id } } }
            ]
          }
        })

        console.log(user)
        if (!user) {
          return {
            ok: false,
            error: "존재하지 않는 사용자입니다."
          }
        }

        const delfriend = await client.friendRequest.updateMany({
          where: {
            OR: [{
              recieverId: loggedInUser.id,
              senderId: user.id
            }, {
              recieverId: user.id,
              senderId: loggedInUser.id
            }],
          },
          data: { status: DECLINED }
        });
        

        return {
          ok: true,
        }
      }
    )
  }
}