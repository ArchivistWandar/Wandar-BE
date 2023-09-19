import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    editLand: protectedResolver(
      async (_, { id, landname }, { loggedInUser }) => {
        const oldLand = client.land.findUnique({ where: { id, userId: loggedInUser.id } })
        console.log(landname)
        if (!oldLand) {
          console.log("notfound")
          return {
            ok: false,
            error: "Land not found."
          }
        } else {
          console.log("found")
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