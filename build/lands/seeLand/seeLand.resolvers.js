import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";
export default {
  Query: {
    seeLand: protectedResolver( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function (_, _ref2) {
        let {
          userId
        } = _ref2;
        return function* () {
          const land = yield client.land.findMany({
            where: {
              userId
            },
            select: {
              landname: true,
              composition: true,
              user: {
                select: {
                  username: true
                }
              }
            }
          });
          return land;
        }();
      });
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }())
  }
};