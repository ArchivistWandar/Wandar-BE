import client from "../../client.js"
import bcrypt from "bcrypt"

export default {
  Mutation: {
    createAccount: async (
      _,
      {
        name,
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
        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data:
          {
            name,
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