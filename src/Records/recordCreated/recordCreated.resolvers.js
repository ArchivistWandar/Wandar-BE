import { withFilter } from 'graphql-subscriptions';
import { RECORD_CREATED } from '../../constants.js';
import pubsub from '../../pubsub.js';
import client from '../../client.js';

export default {
  Subscription: {
    recordCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(RECORD_CREATED),
        async (payload, variable, context) => {
          const ifUser = await client.user.count({
            where: { id: context.loggedInUser.id, following: { some: { id: payload.recordCreated.userId } } },
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