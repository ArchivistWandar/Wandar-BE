import { withFilter } from 'graphql-subscriptions';
import { LAND_CREATED } from '../../constants.js';
import pubsub from '../../pubsub.js';
import client from '../../client.js';

export default {
  Subscription: {
    landUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(LAND_CREATED),
        async (payload, variable, context) => {


          const ifUser = await client.user.count({
            where: { id: context.loggedInUser.id, lands: { some: { id: payload.landUpdated.id } } },
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