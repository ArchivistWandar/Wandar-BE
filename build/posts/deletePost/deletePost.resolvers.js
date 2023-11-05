import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import client from "../../client.js";
import { delPhotoS3 } from "../../shared/shared.utils.js";
import { protectedResolver } from "../../users/users.utils.js";
export default {
  Mutation: {
    deletePost: protectedResolver( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function (_, _ref2, _ref3) {
        let {
          id
        } = _ref2;
        let {
          loggedInUser
        } = _ref3;
        return function* () {
          const post = yield client.post.findUnique({
            where: {
              id
            },
            select: {
              userId: true,
              photos: true
            }
          });
          if (!post) {
            return {
              ok: false,
              error: "Post not found"
            };
          }
          //post.userId != loggedinuser.id 예외처리
          if (post.userId != loggedInUser.id) {
            return {
              ok: false,
              error: "Unauthorized user."
            };
          }
          const {
            photos
          } = yield client.post.delete({
            where: {
              id
            },
            include: {
              photos: true
            }
          });
          const photosURLArray = photos.map(obj => obj.photo);
          if (photosURLArray) {
            delPhotoS3(photosURLArray, "uploads");
          }
          return {
            ok: true
          };
          //client.post.delete
        }();
      });
      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }())
  }
};