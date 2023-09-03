import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    deletePhoto: protectedResolver(
      async (_, {id}, {loggedInUser}) => {
        // photo 찾고
        //!photo 예외 처리
        //photo.userid != loggedinuser.id 예외 처림
        //client.delete
        //delphotos3
      }
    )
  }
}