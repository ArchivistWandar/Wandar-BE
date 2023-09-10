import client from "../../client.js"
import { protectedResolver } from "../../users/users.utils.js";


export default {
  Mutation: {
    createLand: protectedResolver(

      async (_, { landname }, { loggedInUser }) => {
        const existingLand = await client.land.findFirst({ where: { landname } });
        if (existingLand) {
          return {
            ok: false,
            error: "already existing landname."
          }
        }

        const newLand = await client.land.create({
          data: {
            landname,
            user: { connect: { id: loggedInUser.id } }
          }
        })
        if (newLand) {
          return {
            ok: true,
          }
        }
      }
    )
  }
}