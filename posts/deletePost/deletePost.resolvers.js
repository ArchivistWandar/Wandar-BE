import client from "../../client.js";
import { delPhotoS3 } from "../../shared/shared.utils.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    deletePost: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const post = await client.post.findUnique({ where: { id }, select: { userId: true, photos: true } })
        if (!post) {
          return {
            ok: false,
            error: "Post not found"
          }
        }
        //post.userId != loggedinuser.id 예외처리
        if (post.userId != loggedInUser.id) {
          return {
            ok: false,
            error: "Unauthorized user."
          }
        }
        const {photos} = await client.post.delete({ where: { id } })
        delPhotoS3(photos, "uploads")
        return{
          ok: true
        }
        //client.post.delete
      }
    )
  }
}