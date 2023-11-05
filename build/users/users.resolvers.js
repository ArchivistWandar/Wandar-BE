import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import client from "../client.js";
export default {
  User: {
    totalFollowing: _ref => {
      let {
        id
      } = _ref;
      return client.user.count({
        where: {
          followers: {
            some: {
              id
            }
          }
        }
      });
    },
    totalFollowers: _ref2 => {
      let {
        id
      } = _ref2;
      return client.user.count({
        where: {
          following: {
            some: {
              id
            }
          }
        }
      });
    },
    isMe: (_ref3, _, _ref4) => {
      let {
        id
      } = _ref3;
      let {
        loggedInUser
      } = _ref4;
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: function () {
      var _isFollowing = _asyncToGenerator(function (_ref5, _, _ref6) {
        let {
          id
        } = _ref5;
        let {
          loggedInUser
        } = _ref6;
        return function* () {
          if (!loggedInUser) {
            return false;
          }
          // const exists = await client.user.findUnique({ where: { username: loggedInUser.username } })
          //   .following({ where: { id } })

          const exists = yield client.user.count({
            where: {
              username: loggedInUser.username,
              following: {
                some: {
                  id
                }
              }
            }
          });
          return Boolean(exists);
        }();
      });
      function isFollowing(_x, _x2, _x3) {
        return _isFollowing.apply(this, arguments);
      }
      return isFollowing;
    }(),
    photos: _ref7 => {
      let {
        id
      } = _ref7;
      return client.photo.findMany({
        where: {
          userId: id
        }
      });
    },
    posts: _ref8 => {
      let {
        id
      } = _ref8;
      return client.post.findMany({
        where: {
          userId: id
        }
      });
    },
    lands: _ref9 => {
      let {
        id
      } = _ref9;
      return client.land.findMany({
        where: {
          userId: id
        }
      });
    },
    lastUpdate: function () {
      var _lastUpdate = _asyncToGenerator(function (_ref10) {
        let {
          id
        } = _ref10;
        return function* () {
          const latestPost = yield client.post.findFirst({
            where: {
              userId: id
            },
            orderBy: {
              createdAt: 'desc'
            }
          });

          // console.log(latestPost ? latestPost.createdAt : null)
          return latestPost ? latestPost.createdAt : null;
        }();
      });
      function lastUpdate(_x4) {
        return _lastUpdate.apply(this, arguments);
      }
      return lastUpdate;
    }()
  }
};