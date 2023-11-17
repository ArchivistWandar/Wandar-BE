import client from "../client.js"

export default {
  Post: {
    user: ({ userId }) => {
      return client.user.findUnique({ where: { id: userId } })
    },
    hashtags: ({ id }) => {
      return client.hashtag.findMany({ where: { posts: { id } } })
    },
    photos: ({ id }) => {
      return client.photo.findMany({ where: { post: { id } } })
    },
    isMine: async ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      return await userId === loggedInUser.id
    },
    land: ({ landId }) => {
      return client.land.findUnique({ where: { id: landId } })
    }
  },
  Photo: {
    user: ({ userId }) => {
      return client.user.findUnique({ where: { id: userId } })
    },
    land: ({ landId }) => {
      return client.land.findUnique({ where: { id: landId } })
    },
    record: ({ recordId }) => {

      if (recordId) {
        return client.record.findUnique({ where: { id: recordId } })
      }
    },
    post: ({ postId }) => {

      if (postId) {
        return client.post.findUnique({ where: { id: postId } })
      }
    },
    isMine: async ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      return await userId === loggedInUser.id
    },

  },
  Hashtag: {
    posts: ({ id }) => {
      return client.hashtag.
        findUnique({ where: { id } })
        .photos({ take: 2, skip: (page - 1) * 2 })
    },
    totalPosts: ({ id }) => {
      return client.post.count({
        where: {
          hashtags: { some: { id } },
          isPublic: true
        }
      })
    }

  }
}