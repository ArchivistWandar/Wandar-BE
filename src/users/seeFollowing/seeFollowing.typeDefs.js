const typeDefs = `#graphql
  type SeeFollowingResult{
    ok: Boolean!
    error: String
    following:[User]
  }
  type Query {
    seeFollowing(username: String!, lastId: Int): SeeFollowingResult
  }
`
export default typeDefs