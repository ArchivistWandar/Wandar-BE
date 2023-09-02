import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    editPost: protectedResolver(
      async (_, { id, caption, land }, { loggedInUser }) => {
        //edit post mutation 
        //old post 찾고
        //예외처리 !oldpost  
        //client.update
        //return ok
      })
  }
}