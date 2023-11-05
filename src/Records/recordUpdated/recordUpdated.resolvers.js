import { withFilter } from 'graphql-subscriptions';
import { RECORD_CREATED } from '../../constants.js';
import pubsub from '../../pubsub.js';
import client from '../../client.js';

export default {
  Subscription: {
    recordUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(RECORD_CREATED),
        async (payload, variable, context) => {

          // const ifUser = await client.user.count({
          //   where: { id: context.loggedInUser.id, records: { some: { id: payload.recordUpdated.id } } },
          // })
          console.log(context.loggedInUser.id, payload.recordUpdated.userId)

          return context.loggedInUser.id === payload.recordUpdated.userId
            




          // return true

        }
      )


    },

  },
  // ...other resolvers...
};