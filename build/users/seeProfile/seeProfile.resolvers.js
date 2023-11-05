import client from "../../client.js";
export default {
  Query: {
    seeProfile: (_, _ref) => {
      let {
        username
      } = _ref;
      return client.user.findUnique({
        where: {
          username
        },
        include: {
          following: true,
          followers: true
        }
      });
    }
  }
};