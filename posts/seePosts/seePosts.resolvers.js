import client from "../../client.js"

export default {
  Query: {
    seePosts: (_, { userId }) => {
      const post = client.post.findMany({ where: { userId }, include: {photos: true, land: true, user: true} })
      return post
    }
  }
}