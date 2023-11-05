import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import client from "../client.js";
export default {
  Record: {
    user: _ref => {
      let {
        userId
      } = _ref;
      return client.user.findUnique({
        where: {
          id: userId
        }
      });
    },
    photos: function () {
      var _photos = _asyncToGenerator(function (_ref2) {
        let {
          id
        } = _ref2;
        return function* () {
          return yield client.photo.findMany({
            where: {
              records: {
                some: {
                  id
                }
              }
            }
          });
        }();
      });
      function photos(_x) {
        return _photos.apply(this, arguments);
      }
      return photos;
    }(),
    lands: function () {
      var _lands = _asyncToGenerator(function (_ref3) {
        let {
          photoId
        } = _ref3;
        return function* () {
          return yield client.land.findMany({
            where: {
              photos: {
                some: {
                  id: photoId
                }
              }
            }
          });
        }();
      });
      function lands(_x2) {
        return _lands.apply(this, arguments);
      }
      return lands;
    }(),
    isMine: function () {
      var _isMine = _asyncToGenerator(function (_ref4, _, _ref5) {
        let {
          userId
        } = _ref4;
        let {
          loggedInUser
        } = _ref5;
        return function* () {
          if (!loggedInUser) {
            return false;
          }
          return (yield userId) === loggedInUser.id;
        }();
      });
      function isMine(_x3, _x4, _x5) {
        return _isMine.apply(this, arguments);
      }
      return isMine;
    }()
  }
};