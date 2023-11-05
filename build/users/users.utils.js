import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import jwt from "jsonwebtoken";
import client from "../client.js";
export const getUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (token) {
    try {
      if (!token) {
        return null;
      }
      const {
        id
      } = yield jwt.verify(token, process.env.SECRET_KEY);
      const user = yield client.user.findUnique({
        where: {
          id
        }
      });
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (_unused) {
      return null;
    }
  });
  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      const query = info.operation.operation == "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please login to perform this action."
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
}