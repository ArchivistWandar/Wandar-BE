import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    deletePost: protectedResolver(
      async (_, {id}, {loggedInUser}) => {
        const post = await client.post.findUnique({where: {id}, select: {userId: true, photos: true}})
        //!post 예외처리
        //post.userId != loggedinuser.id 예외처리
        //client.post.delete
      }
    )
  }
}