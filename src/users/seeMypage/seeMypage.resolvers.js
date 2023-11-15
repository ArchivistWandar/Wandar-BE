import client from "../../client.js";
import { protectedResolver } from "../users.utils.js";

export default {
  Query: {
    seeMypage: protectedResolver(
      async (_, __, { loggedInUser }) => {
        const myActivity = await client.user.findUnique({
          where: {
            id: loggedInUser.id
          },
          include: {
            posts: { select: { photos: { select: { photo: true } }, createdAt: true, land: { select: { landname: true } } } },
            records: { select: { photos: { select: { photo: true } }, createdAt: true, lands: { select: { landname: true } } } },
            lands: { select: { landname: true, createdAt: true } }
          }
        })

        return myActivity
      }
    )
  }
}