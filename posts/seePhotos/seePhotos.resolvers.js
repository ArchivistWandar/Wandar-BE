import client from "../../client.js"

export default {
  Query: {
    seePhotos: (_, { userId }) => {
      //post의 ispublic이 true인 경우에만 찾기
      const photoList = client.photo.findMany({ where: { userId, isPublic: true } })
      return photoList

    }
  }
}