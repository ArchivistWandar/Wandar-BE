import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    editRecord: protectedResolver(
      async (_, { id, title, photoIds, theme }, { loggedInUser }) => {
        for (let i = 0; i < photoIds.length; i++) {
          const photo = await client.photo.findUnique({ where: { id: photoIds[i] }, select: { userId: true } })
          if (!photo) {
            return {
              ok: false,
              error: "photo does not exist."
            }
          } else if (photo.userId != loggedInUser.id) {
            return {
              ok: false,
              error: "Unauthorized user."
            }
          }
        }
        console.log(photoIds)
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
            ...(photoIds.length > 0 && {
              photos: {
                set: [],
                connect: photoIds.map((photoId) => ({ id: photoId }))
              }
            }),
            theme,
            title
          }
        })

        return {
          ok: true
        }

      }
    )
  }
}