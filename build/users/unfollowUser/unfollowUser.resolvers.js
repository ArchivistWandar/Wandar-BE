import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import client from "../../client.js";
import { protectedResolver } from "../users.utils.js";
export default {
  Mutation: {
    unfollowUser: protectedResolver( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function (_, _ref2, _ref3) {
        let {
          username
        } = _ref2;
        let {
          loggedInUser
        } = _ref3;
        return function* () {
          const ok = yield client.user.findUnique({
            where: {
              username
            }
          });
          if (!ok) {
            return {
              ok: false,
              error: "존재하지 않는 사용자입니다."
            };
          }
          yield client.user.update({
            where: {
              id: loggedInUser.id
            },
            data: {
              following: {
                disconnect: {
                  username
                }
              }
            }
          });
          return {
            ok: true
          };
        }();
      });
      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }())
  }
};