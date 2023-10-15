import client from "../client.js"

export default {
  Post: {
    user: ({ userId }) => {
      return client.user.findUnique({ where: { id: userId } })
    },
    hashtags: ({ id }) => {
      return client.hashtag.findMany({ where: { posts: { some: { id } } } })
    },
    photos: ({ id }) => {
      return client.photo.findMany({ where: { post: { some: { id } } } })
    },
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      return userId === loggedInUser.id
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