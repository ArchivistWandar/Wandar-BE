import client from "../../client.js";
import { uploadToS3 } from "../../shared/shared.utils.js";
import { protectedResolver } from "../../users/users.utils.js";
import { processHashtags } from "../posts.utils.js";

export default {
  Mutation: {
    editPost: protectedResolver(
      async (_, { id, title, caption, landId, photos, isPublic }, { loggedInUser }) => {
        //edit post mutation 
        //old post 찾고
        const oldPost = await client.post.findUnique({ where: { id, userId: loggedInUser.id }, include: { hashtags: { select: { hashtag: true } }, photos: true } })
        //예외처리 !oldpost  
        if (!oldPost) {
          return {
            ok: false,
            error: "Post not found."
          }
        } else if (oldPost.userId != loggedInUser.id) {
          return {
            ok: false,
            error: "Unauthorized User"
          }
        }
        //photo 업로드는 해결, hashtag 처리 필요

        const hashtagsObj = processHashtags(caption)

        const fileURLArray = await uploadToS3(photos, loggedInUser.id, "uploads")
        const uploadedPhotos = fileURLArray.map(
          (url) => ({
            photo: url,
            user: { connect: { id: loggedInUser.id } },
            land: { connect: { id: (landId || oldPost.landId) } },
            isPublic: (isPublic != undefined ? isPublic : oldPost.isPublic)
          })
        ) || []


        const post = await client.post.update({
          where: { id },
          data: {
            user: { connect: { id: loggedInUser.id } },
            land: { connect: { id: landId || oldPost.landId } },
            title,
            caption,
            ...(uploadedPhotos.length > 0 && {
              photos: {
                deleteMany: {},
                create: uploadedPhotos
              }
            }),
            ...(hashtagsObj.length > 0 && { hashtags: {
              disconnect: oldPost.hashtags,
              connectOrCreate: hashtagsObj,
            } }),
            isPublic: (isPublic != undefined ? isPublic : oldPost.isPublic)
          }
        })
        // //새로 update된 post의 photo 모델
        // for (i = 0; i < fileURLArray.length; i++) {
        //   await client.photo.create({
        //     data: {
        //       photo: fileURLArray[i],
        //       land: { connect: { id: landId } },
        //       user: { connect: { id: loggedInUser.id } },
        //       post: createdPost,
        //       isPublic
        //     }
        //   })        // }

        return {
          ok: true
        }
      })
  }
}