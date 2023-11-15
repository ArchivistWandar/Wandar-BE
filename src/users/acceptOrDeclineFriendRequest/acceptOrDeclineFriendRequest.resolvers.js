import client from "../../client.js";
import { ACCEPTED, DECLINED, protectedResolver } from "../users.utils.js";

export default {
  Mutation: {
    acceptOrDeclineFriendRequest: protectedResolver(
      async (_, { username, isAccepting }, { loggedInUser }) => {
        const requester = await client.user.findUnique({ where: { username } })
        if (!requester){
          return {
            ok: false,
            error: "User does not exist"
          }
        }
        const request = await client.friendRequest.findUnique({
          where: {
            senderId_recieverId: {
              recieverId: loggedInUser.id,
              senderId: requester.id
            }
          }
        })

        if (request) {
          if (isAccepting) {
            await client.friendRequest.update({
              where: {
                senderId_recieverId: {
                  recieverId: loggedInUser.id,
                  senderId: requester.id
                }
              },
              data: {
                status: ACCEPTED
              }
            });
            return {
              ok: true,
            }
          } else {
            await client.friendRequest.update({
              where: {
                senderId_recieverId: {
                  recieverId: loggedInUser.id,
                  senderId: requester.id
                }
              },
              data: {
                status: DECLINED
              }
            });
            return {
              ok: true,
            }
          }
        } else {
          return {
            ok: false,
            error: "No such request exists"
          }

        }
      }
    )
  }
}