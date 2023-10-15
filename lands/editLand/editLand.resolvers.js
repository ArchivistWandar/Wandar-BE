import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    editLand: protectedResolver(
      async (_, { id, landname }, { loggedInUser }) => {
        const oldLand = await client.land.findUnique({ where: { id }, select: { landname: true, userId: true } })
        const existingLandname = await client.land.findFirst({ where: { landname }, select: { landname: true } })
        if (!oldLand) {
          return {
            ok: false,
            error: "Land not found."
          }
        } else if (oldLand.userId != loggedInUser.id) {
          return {
            ok: false,
            error: "Unauthorized user"
          }

        } else if (existingLandname) {
          return {
            ok: false,
            error: "already existing landname."
          }
        } else {
          const land = await client.land.update({
            where: { id },
            data: {
              landname
            }
          })
          return {
            ok: true
          }
        }
      }
    )
  }
}