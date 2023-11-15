import client from "../client.js"

export default {
  Record: {
    user: ({ userId }) => {
      return client.user.findUnique({ where: { id: userId } })
    },
    photos: async ({ id }) => {
      return await client.photo.findMany({ where: { recordId: id } })
    },
    lands: async ({ photoId }) => {
      return await client.land.findMany({ where: { photos: { some: { id: photoId } } } })
    },
    isMine: async ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      return await userId === loggedInUser.id
    },
  },
}