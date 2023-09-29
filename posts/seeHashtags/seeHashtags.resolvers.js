import client from "../../client.js"

export default {
  Query: {
    seeHashtags: (_, { hashtag }) => {
      return client.hashtag.findUnique({ where: { hashtag } })
    }
  }
}