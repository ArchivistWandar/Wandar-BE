import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    deleteRecord: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const record = await client.record.findUnique({ where: { id } })
        if (!record) {
          return {
            ok: false,
            error: "record not found"
          }
        } else if (record.userId != loggedInUser.id) {
          return {
            ok: false,
            error: "Unauthorized User"
          }
        } else {
          await client.record.delete({ where: { id } })
          return {
            ok: true
          }
        }

      }
    )
  }
}