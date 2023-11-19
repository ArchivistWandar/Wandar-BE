import client from "../../client.js"
import { protectedResolver } from "../users.utils.js"

export default {
  Query: {
    searchUsers: protectedResolver(
      async (_, { keyword, lastId }, { loggedInUser }) => {
        const users = await client.user
          .findMany({
            where: { username: { startsWith: keyword.toLowerCase() } },
            orderBy: {
              id: 'asc',
            },
            select: {
              username:true,
              avatar:true,
              id: true,
              updatedAt: true
            },
            take: 10,
            skip: lastId ? 1 : 0,
            cursor: lastId ? { id: lastId } : undefined
          })
        console.log(lastId)

        return users
      })

  }
}