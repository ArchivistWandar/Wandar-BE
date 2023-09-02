import client from "../../client.js";
import { uploadToS3 } from "../../shared/shared.utils.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    createPost: protectedResolver(
      async (_, {caption, photos, land}) => {

        //upload 구조 수정 필요
        let hashtagsObj = [];
        for (let i = 0; i < photos.length; i++){
          photo = photos[i]
          const fileURL = await uploadToS3(photo, loggedInUser)
        }

        return await client.post.create({
          data: {
            photos: fileURL,
            caption,
            land,
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagsObj.length > 0 && { hashtags: { connectOrCreate: hashtagsObj, } })
          }
        })
      }
    )
  }
}