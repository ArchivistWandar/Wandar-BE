import client from "../../client.js"
import { protectedResolver } from "../../users/users.utils.js"

export default {
  Query: {
    getPost: protectedResolver(
      async (_, { id }, { loggedInUser }) => {

        console.log("getpost")

        const post = await client.post.findUnique({
          where: { id, },
          include: { photos: { select: { photo: true } }, land: { select: { landname: true } } }
        })


        if ((post.userId != loggedInUser.id) && (!post.isPublic)){
          throw new Error("Unauthorized User.")
        } else {
          return post
        }

      })
  }
}