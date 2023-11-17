import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Query: {
    getRecord: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        //자기 자신 record 조회시 전체 찾기
        const records = await client.record.findUnique({ where: { id }, include: {photos: true}})
        console.log(records)
        return records


      }
    )
  }
}