import client from "../../client.js"
import { protectedResolver } from "../../users/users.utils.js"

export default {
  Query: {
    getLandPosts: protectedResolver(
      async (_, { landId }, { loggedInUser }) => {
        //post의 ispublic이 true인 경우에만 찾기
        //자기 자신 post 조회시 전체 찾기
        const user = await client.user.findFirst({ where: { lands: { some: { id: landId } } }, select: { id: true } })
        if (!user) {
          throw new Error("User not found.")
        }


        if (loggedInUser.id != user.id) {
          const postList = await client.post.findMany({
            where: { landId, isPublic: true },
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
            where: { landId },
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