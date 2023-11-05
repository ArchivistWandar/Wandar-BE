import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import { withFilter } from 'graphql-subscriptions';
import { LAND_CREATED } from '../../constants.js';
import pubsub from '../../pubsub.js';
import client from '../../client.js';
export default {
  Subscription: {
    landCreated: {
      subscribe: withFilter(() => pubsub.asyncIterator(LAND_CREATED), /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (payload, variable, context) {
          const ifUser = yield client.user.count({
            where: {
              id: context.loggedInUser.id,
              following: {
                some: {
                  id: payload.landCreated.userId
                }
              }
            }
          });

          // console.log("context", context)
          return Boolean(ifUser);

          // return true
        });
        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }())
    }
  }
  // ...other resolvers...
};