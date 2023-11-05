import client from "../client.js"

export default {
  Land: {
    user: ({ userId }) => {
      return client.user.findUnique({ where: { id: userId } })
    },
    photos: ({ id }) => {
      return client.photo.findMany({ where: { landId: id } })
    },
    posts: ({ id }) => {
      return client.post.findMany({ where: { landId: id } })
    },
    isMine: async ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      return await userId === loggedInUser.id
    },
  },
}