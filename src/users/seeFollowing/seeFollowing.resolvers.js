import client from "../../client.js"

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const ok = client.user.findUnique({ where: { username }, select: { id: true } })
      console.log(ok)
      if (!ok) {
        return {
          ok: false,
          error: "사용자를 찾을 수 없습니다."
        }
      }
      const following = await client.user
        .findUnique({ where: { username, } })
        .following({
          take: 2,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } })
        })
      return {
        ok: true,
        following
      }
    }
  }
}