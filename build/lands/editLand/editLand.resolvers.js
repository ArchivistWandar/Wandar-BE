import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";
export default {
  Mutation: {
    editLand: protectedResolver( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function (_, _ref2, _ref3) {
        let {
          id,
          landname,
          composition
        } = _ref2;
        let {
          loggedInUser
        } = _ref3;
        return function* () {
          const oldLand = yield client.land.findUnique({
            where: {
              id
            },
            select: {
              landname: true,
              userId: true
            }
          });
          const existingLandname = yield client.land.findFirst({
            where: {
              landname
            },
            select: {
              landname: true
            }
          });
          if (!oldLand) {
            return {
              ok: false,
              error: "Land not found."
            };
          } else if (oldLand.userId != loggedInUser.id) {
            return {
              ok: false,
              error: "Unauthorized user"
            };
          } else if (existingLandname) {
            return {
              ok: false,
              error: "already existing landname."
            };
          } else {
            const land = yield client.land.update({
              where: {
                id
              },
              data: {
                landname,
                composition
              }
            });
            return {
              ok: true
            };
          }
        }();
      });
      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }())
  }
};