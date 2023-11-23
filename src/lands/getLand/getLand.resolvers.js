import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Query: {
    getLand: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const land = await client.land.findUnique({ where: { id }, select: { composition: true, landname: true, createdAt: true } })

        return land
      }
    )
  }
}