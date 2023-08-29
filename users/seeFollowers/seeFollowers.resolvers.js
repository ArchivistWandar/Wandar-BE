import client from "../../client.js"

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const ok = client.user.findUnique({ where: { username }, select: {id: true} }) //select: 데이터베이스에서 username 외 불필요한 정보를 불러오지 X
      console.log(ok)
      if (!ok) {
        return {
          ok: false,
          error: "사용자를 찾을 수 없습니다."
        }
      }
      const followers = await client.user
        .findUnique({ where: { username, } })
        .followers({ take: 2, skip: (page - 1) * 2 })

      const totalFollowers = await client.user.count({ where: { following: { some: { username } } } })


      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 2)
      }
    }
  }
}