import client from "../../client.js"
import { ACCEPTED } from "../users.utils.js"

export default {
  Query: {
    seeFriends: async (_, { username }) => {
      const foundUser = await client.user.findUnique({ where: { username }, select: { id: true } }) //select: 데이터베이스에서 username 외 불필요한 정보를 불러오지 X
      if (!foundUser) {
        return {
          ok: false,
          error: "사용자를 찾을 수 없습니다."
        }
      }
      const friends = await client.user.findMany({
        where: {
          OR: [
            { requestRecieved: { some: { senderId: foundUser.id, status: ACCEPTED }, } },
            { requestSent: { some: { recieverId: foundUser.id, status: ACCEPTED } } }
          ]
        },
        select: { id: true, username: true, avatar: true, }
      })

      return {
        ok: true,
        friends,
        totalFriends: friends.length
      }
    }
  }
}