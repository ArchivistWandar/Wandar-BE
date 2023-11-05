import client from "../../client.js";
export default {
  Query: {
    seeHashtags: (_, _ref) => {
      let {
        hashtag
      } = _ref;
      return client.hashtag.findUnique({
        where: {
          hashtag
        }
      });
    }
  }
};