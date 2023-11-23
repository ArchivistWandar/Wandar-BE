import client from "../../client.js"
import { protectedResolver } from "../../users/users.utils.js"

export default {
  Query: {
    seePosts: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        //post의 ispublic이 true인 경우에만 찾기
        //자기 자신 post 조회시 전체 찾기
        const user = await client.user.findUnique({ where: { username }, select: { id: true } })
        if (!user) {
          throw new Error("User not found.")
        }

        
        if (loggedInUser.id != user.id) {
          const postList = await client.post.findMany({
            where: { user: { id: user.id }, isPublic: true },
            include: {
              photos: { select: { photo: true } },
              land: true,
              user: true,
              hashtags: true
            }
          })
          return postList
        } else {
          const postList = await client.post.findMany({
            where: { user: { id: user.id } },
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