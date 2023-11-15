import client from "../../client.js";
import { uploadToS3 } from "../../shared/shared.utils.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    editRecord: protectedResolver(
      async (_, { id, title, photos, theme, isPublic }, { loggedInUser }) => {
        // for (let i = 0; i < photoIds.length; i++) {
        //   const photo = await client.photo.findUnique({ where: { id: photoIds[i] }, select: { userId: true } })
        //   if (!photo) {
        //     return {
        //       ok: false,
        //       error: "photo does not exist."
        //     }
        //   } else if (photo.userId != loggedInUser.id) {
        //     return {
        //       ok: false,
        //       error: "Unauthorized user."
        //     }
        //   }
        // }
        // console.log(photoIds)
        const fileURLArray = await uploadToS3(photos, loggedInUser.id, "uploads")
        const uploadedPhotos = fileURLArray.map(
          (url) => ({
            photo: url,
            user: { connect: { id: loggedInUser.id } },
            land: { connect: { id: (landId || oldPost.landId) } },
            isPublic: (isPublic != undefined ? isPublic : oldPost.isPublic)
          })
        ) || []
        const oldRecord = await client.record.findUnique({ where: { id }, include: { photos: true } })
        //예외처리 !oldpost  
        if (!oldRecord) {
          return {
            ok: false,
            error: "Post not found."
          }
        } else if (oldRecord.userId != loggedInUser.id) {
          return {
            ok: false,
            error: "Unauthorized User"
          }
        }

        const record = await client.record.update({
          where: { id },
          data: {
            user: { connect: { id: loggedInUser.id } },
            ...(uploadedPhotos.length > 0 && {
              photos: {
                deleteMany: {},
                create: uploadedPhotos
              }
            }),
            theme,
            title,
            isPublic
          }
        })

        return {
          ok: true
        }

      }
    )
  }
}