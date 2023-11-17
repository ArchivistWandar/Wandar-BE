import client from "../../client.js"
import { protectedResolver } from "../../users/users.utils.js"

export default {
  Query: {
    getPost: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        //post의 ispublic이 true인 경우에만 찾기
        //자기 자신 post 조회시 전체 찾기
        // const user = await client.user.findFirst({ where: { lands: { some: { id: landId } } }, select: { id: true } })
        // if (!user) {
        //   throw new Error("User not found.")
        // }

        const post = await client.post.findUnique({
          where: { id },
          include: { photos: { select: { photo: true } }, land: { select: { landname: true } } }
        })

        if (post.userId != loggedInUser.id) {
          throw new Error("Unauthorized User.")
        } else {
          return post
        }

      })
  }
}