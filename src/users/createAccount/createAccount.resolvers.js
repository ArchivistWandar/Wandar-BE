import client from "../../client.js"
import bcrypt from "bcrypt"
import { uploadToS3 } from "../../shared/shared.utils.js";

export default {
  Mutation: {
    createAccount: async (
      _,
      {
        username,
        email,
        password
      }) => {
      //check if username, email is unique
      //hash password
      //save and return user
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });

        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }

        // let avatarUrl = null;
        // if (avatar) {
        //   avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars")
        // }

        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data:
          {
            username,
            email,
            password: uglyPassword,
          },
        })
        return {
          ok: true,
        }
      } catch (e) {
        return e;
      }
    },
  },
};