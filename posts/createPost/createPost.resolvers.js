import client from "../../client.js";
import { uploadToS3 } from "../../shared/shared.utils.js";
import { protectedResolver } from "../../users/users.utils.js";
import { processHashtags } from "../posts.utils.js";

export default {
  Mutation: {
    createPost: protectedResolver(
      async (_, { title, caption, photos, landId, isPublic, isPublished }, { loggedInUser }) => {

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

        if (!land) {
          return {
            ok: false,
            error: "land does not exist"
          }
        }
        if (caption) {
          hashtagsObj = processHashtags(caption)
        }
        const uploadedPhotos = fileURLArray.map(
          (url) => ({
            photo: url,
            isPublic,
            land: { connect: { id: landId } },
            user: { connect: { id: loggedInUser.id } }
          })
        )
        


        const createdPost = await client.post.create({
          data: {
            photos: { create: uploadedPhotos },
            title,
            caption,
            isPublic,
            isPublished,
            land: { connect: { id: landId } },
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagsObj.length > 0 && { hashtags: { connectOrCreate: hashtagsObj, } })
          }
        })
        

        // for (i = 0; i < fileURLArray.length; i++) {
        //   await client.photo.create({
        //     data: {
        //       photo: fileURLArray[i],
        //       land: { connect: { id: landId } },
        //       user: { connect: { id: loggedInUser.id } },
        //       post: createdPost,
        //       isPublic
        //     }
        //   })
        // }

        return {
          ok: true,
        }

      }
    )
  }
}