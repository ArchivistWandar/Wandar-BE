import client from "../../client.js";
import { uploadToS3 } from "../../shared/shared.utils.js";
import { protectedResolver } from "../../users/users.utils.js";
import { processHashtags } from "../posts.utils.js";

export default {
  Mutation: {
    createPost: protectedResolver(
      async (_, { caption, photos, landId, isPublic }, { loggedInUser }) => {

        //upload 구조 수정 필요
        let hashtagsObj = [];

        // for (let i = 0; i <= photos.length; i++) {
        //   let photo = await photos[i]
        //   console.log("first photo is", photo)
        //   const fileURL = await uploadToS3(photo, loggedInUser.id, "uploads");
        //   fileURLArray.push({ fileURL })
        // }
        const fileURLArray = await uploadToS3(photos, loggedInUser.id, "uploads")
        const land = await client.land.findUnique({ where: { id: landId } })
        console.log(land)
        if (!land) {
          return {
            ok: false,
            error: "land does not exist"
          }
        }
        if (caption) {
          hashtagsObj = processHashtags(caption)
        }

        await client.post.create({
          data: {
            photos: fileURLArray,
            caption,
            isPublic,
            land: {connect: {id: landId}},
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagsObj.length > 0 && { hashtags: { connectOrCreate: hashtagsObj, } })
          }
        })
        return {
          ok: true,
        }

      }
    )
  }
}