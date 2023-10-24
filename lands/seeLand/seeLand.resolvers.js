import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Query: {
    seeLand: protectedResolver(
      async (_, { userId }) => {
        const land = await client.land.findMany({ where: { userId }, select: { landname: true, composition: true, user: { select: { username: true } } } })
        return land
      }
    )
  }
}