import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import client from "../client.js";
export default {
  Land: {
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
    photos: _ref2 => {
      let {
        id
      } = _ref2;
      return client.photo.findMany({
        where: {
          landId: id
        }
      });
    },
    posts: _ref3 => {
      let {
        id
      } = _ref3;
      return client.post.findMany({
        where: {
          landId: id
        }
      });
    },
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
      function isMine(_x, _x2, _x3) {
        return _isMine.apply(this, arguments);
      }
      return isMine;
    }()
  }
};