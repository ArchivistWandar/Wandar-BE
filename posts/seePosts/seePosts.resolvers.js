import client from "../../client.js"
import { protectedResolver } from "../../users/users.utils.js"

export default {
  Query: {
    seePosts: protectedResolver(
      async (_, { userId }, { loggedInUser }) => {
        //post의 ispublic이 true인 경우에만 찾기
        //자기 자신 post 조회시 전체 찾기
        if (loggedInUser.id != userId) {
          const postList = client.post.findMany({
            where: { userId, isPublic: true },
            include: {
              photos: { select: { photo: true } },
              land: true,
              user: true,
              hashtags: true
            }
          })
          return postList
        } else {
          const postList = client.post.findMany({
            where: { userId },
            include: {
              photos: { select: { photo: true } },
              land: true,
              user: true,
              hashtags: true
            }
          })
          return postList
        }

      })
  }
}