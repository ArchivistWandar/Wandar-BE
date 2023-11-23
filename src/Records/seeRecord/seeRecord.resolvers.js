import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Query: {
    seeRecord: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        //자기 자신 record 조회시 전체 찾기
        const records = await client.record.findMany({ where: { user: { username } }, include: { photos: true } })
        console.log("r")
        return records


      }
    )
  }
}