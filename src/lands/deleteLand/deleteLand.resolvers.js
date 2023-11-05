import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    deleteLand: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const land = await client.land.findUnique({ where: { id }, select: { userId: true } })
        if (!land) {
          return {
            ok: false,
            error: "Land not found"
          }
        } else if (land.userId != loggedInUser.id) {
          return {
            ok: false,
            error: "Unauthorized user"
          }
        } else {
          await client.land.delete({ where: { id } })
          return {
            ok: true
          }
        }
      }
    )
  }
}