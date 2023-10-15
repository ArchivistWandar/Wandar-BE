import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Query: {
    seeLand: protectedResolver(
      async (_, { userId }) => {
        const land = await client.land.findMany({ where: { userId } })
        return land
      }
    )
  }
}