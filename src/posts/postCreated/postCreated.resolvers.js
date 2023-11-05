import { withFilter } from 'graphql-subscriptions';
import { POST_CREATED } from '../../constants.js';
import pubsub from '../../pubsub.js';
import client from '../../client.js';

export default {
  Subscription: {
    postCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(POST_CREATED),
        async (payload, variable, context) => {


          const ifUser = await client.user.count({
            where: { id: context.loggedInUser.id, following: { some: { id: payload.postCreated.userId } } },
          })


          // console.log("context", context)
          return Boolean(ifUser)



          // return true

        }
      )


    },

  },
  // ...other resolvers...
};