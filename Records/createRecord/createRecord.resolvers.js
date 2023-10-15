import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    createRecord: protectedResolver(
      async (_, { title, photoIds, theme }, { loggedInUser }) => {
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
        const record = await client.record.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            photos: { connect: photoIds.map((photoId) => ({ id: photoId })) },
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