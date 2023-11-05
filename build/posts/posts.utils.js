import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.match.js";
export const processHashtags = caption => {
  const hashtags = caption.match(/#[\w]+/g) || [];
  return hashtags.map(hashtag => ({
    where: {
      hashtag
    },
    create: {
      hashtag
    }
  }));
};