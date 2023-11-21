import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Query: {
    seeLand: protectedResolver(
      async (_, { username }) => {
        const land = await client.land.findMany({ where: { user: { username } }, select: { userId: true, id: true, landname: true, composition: true, user: { select: { username: true } } } })
        return land
      }
    )
  }
}