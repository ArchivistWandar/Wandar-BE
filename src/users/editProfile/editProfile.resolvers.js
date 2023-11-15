import client from "../../client.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { protectedResolver } from "../users.utils.js"
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { createWriteStream } from "fs"
import { uploadToS3 } from "../../shared/shared.utils.js";


const resolverFn = async (_, { username, email, password: newPassword, avatar }, { loggedInUser }) => {
  let avatarUrl = null;
  if (avatar) {
    avatarUrl = await uploadToS3([avatar], loggedInUser.id, "avatars")
    console.log(avatarUrl[0])
  }

  let uglyPassword = null
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10)
  }

  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: { username, email, ...(uglyPassword && { password: uglyPassword }), ...(avatarUrl[0] && {avatar: avatarUrl[0]}), }
  })
  if (updatedUser.id) {
    return {
      ok: true,
    }
  } else {
    return {
      ok: false,
      error: "could not update profile."
    }
  }
}

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  }
}