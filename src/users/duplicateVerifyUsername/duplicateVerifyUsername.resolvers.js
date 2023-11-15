import client from "../../client.js"

export default {
  Query: {
    duplicateVerifyUsername: async (_, { username }) => {
      const existingUser = await client.user.findUnique({
        where: { username }
      })
      return Boolean(existingUser)
    }
  }
}