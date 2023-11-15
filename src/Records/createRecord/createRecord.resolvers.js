import client from "../../client.js";
import { RECORD_CREATED } from "../../constants.js";
import pubsub from "../../pubsub.js";
import { uploadToS3 } from "../../shared/shared.utils.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    createRecord: protectedResolver(
      async (_, { title, photos, theme, isPublic }, { loggedInUser }) => {
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
        console.log(photos)
        const fileURLArray = await uploadToS3(photos, loggedInUser.id, "uploads")
        console.log(fileURLArray)
        const uploadedPhotos = fileURLArray.map(
          (url) => ({
            photo: url,
            isPublic,
            user: { connect: { id: loggedInUser.id } }
          })
        )
        const createdRecord = await client.record.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            photos: { create: uploadedPhotos },
            theme,
            title,
            isPublic
          }
        })

        await pubsub.publish(RECORD_CREATED, {
          recordCreated: {
            ...createdRecord
          },
          recordUpdated: {
            ...createdRecord
          },
        });

        return {
          ok: true
        }

      }
    )
  }
}