import client from "../../client.js";
import { uploadToS3 } from "../../shared/shared.utils.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    editPost: protectedResolver(
      async (_, { id, caption, land, photos }, { loggedInUser }) => {
        //edit post mutation 
        //old post 찾고
        const oldPost = await client.post.findUnique({ where: { id, userId: loggedInUser.id }, include: { hashtags: { select: { hashtag: true } } } })
        //예외처리 !oldpost  
        if (!oldPost) {
          return {
            ok: false,
            error: "Post not found."
          }
        }
        if (photos) {
          const fileURLArray = await uploadToS3(photos, loggedInUser.id, "uploads")
          const post = await client.post.update({ where: { id },
            data: {
              caption,
              land,
              photos: fileURLArray
            } })
            return {
              ok: true
            }
        } else {
          const post = await client.post.update({ where: { id },
            data: {
              caption,
              land,
            } })
            return {
              ok: true
            }
        }


      }
      //return ok
    )
  }
}