import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";
export default {
  Query: {
    seePosts: protectedResolver( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function (_, _ref2, _ref3) {
        let {
          userId
        } = _ref2;
        let {
          loggedInUser
        } = _ref3;
        return function* () {
          //post의 ispublic이 true인 경우에만 찾기
          //자기 자신 post 조회시 전체 찾기
          if (loggedInUser.id != userId) {
            const postList = client.post.findMany({
              where: {
                userId,
                isPublic: true
              },
              include: {
                photos: {
                  select: {
                    photo: true
                  }
                },
                land: true,
                user: true,
                hashtags: true
              }
            });
            return postList;
          } else {
            const postList = client.post.findMany({
              where: {
                userId
              },
              include: {
                photos: {
                  select: {
                    photo: true
                  }
                },
                land: true,
                user: true,
                hashtags: true
              }
            });
            return postList;
          }
        }();
      });
      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }())
  }
};