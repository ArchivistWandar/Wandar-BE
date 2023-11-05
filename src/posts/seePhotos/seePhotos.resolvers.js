import client from "../../client.js"
import { protectedResolver } from "../../users/users.utils.js"

export default {
  Query: {
    seePhotos: protectedResolver(
      async (_, { userId }, { loggedInUser }) => {
        //post의 ispublic이 true인 경우에만 찾기
        //자기 자신 photo 조회시 전체 찾기
        if (loggedInUser.id != userId) {
          const photoList = client.photo.findMany({ where: { userId, isPublic: true } })
          return photoList
        } else {
          const photoList = client.photo.findMany({ where: { userId }, select: { photo: true } })
          return photoList
        }

      })
  }
}