import client from "../../client.js";
import { ACCEPTED, DECLINED, PENDING, protectedResolver } from "../users.utils.js";

export default {
  Mutation: {
    sendFriendRequest: protectedResolver(
      async (_, { username }, { loggedInUser }) => {

        const requestedUser = await client.user.findUnique({ where: { username } })
        if (!requestedUser) {
          return {
            ok: false,
            error: "존재하지 않는 사용자입니다."
          }
        }
        const existingFriendship = await client.friendRequest.findUnique({
          where: {
            senderId_recieverId: {
              senderId: loggedInUser.id,
              recieverId: requestedUser.id
            },
            status: ACCEPTED
          },
        })

        if (existingFriendship) {

          return {
            ok: false,
            error: "already friend."
          }
        }

        await client.friendRequest.upsert({
          where: {
            senderId_recieverId: {
              senderId: loggedInUser.id,
              recieverId: requestedUser.id
            },
            OR: [
              { status: DECLINED },
              { status: PENDING },
            ]
          },
          create: {
            requestSender: { connect: { id: loggedInUser.id } },
            requestReciever: { connect: { id: requestedUser.id } }
          },
          update: {
            status: PENDING
          }
        })

        return {
          ok: true,
        }
      }

    )
  }
}