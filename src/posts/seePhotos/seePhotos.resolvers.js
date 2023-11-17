import client from "../../client.js"
import { protectedResolver } from "../../users/users.utils.js"

export default {
  Query: {
    seePhotos: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        //post의 ispublic이 true인 경우에만 찾기
        //자기 자신 photo 조회시 전체 찾기
        const user = client.user.findUnique({ where: { username }, select: { id: true } })
        if (!user) {
          throw new Error("User not found.")
        }
        if (loggedInUser.id != user.id) {
          const photoList = client.photo.findMany({ where: { user: { username }, isPublic: true }, include: { post: true, record: true, land: true } })
          return photoList
        } else {
          const photoList = client.photo.findMany({ where: { user: { username } }, include: { post: true, record: true, land: true } })
          return photoList
        }

      })
  }
}