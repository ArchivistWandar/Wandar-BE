import client from "../../client.js"
import { LAND_CREATED } from "../../constants.js";
import pubsub from "../../pubsub.js";
import { protectedResolver } from "../../users/users.utils.js";


export default {
  Mutation: {
    createLand: protectedResolver(

      async (_, { landname }, { loggedInUser }) => {
        const existingLand = await client.land.findFirst({ where: { landname, userId: loggedInUser.id } });
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

        await pubsub.publish(LAND_CREATED, {
          landCreated: {
            ...newLand
          },
          landUpdated: {
            ...newLand
          },
        });
        if (newLand) {
          return {
            ok: true,
          }
        }
      }
    )
  }
}