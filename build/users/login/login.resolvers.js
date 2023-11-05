import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import client from "../../client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    login: function () {
      var _login = _asyncToGenerator(function (_, _ref) {
        let {
          username,
          password
        } = _ref;
        return function* () {
          const user = yield client.user.findUnique({
            where: {
              username
            }
          });
          if (!user) {
            return {
              ok: false,
              error: "username not found"
            };
          }
          const passwordOk = yield bcrypt.compare(password, user.password);
          if (!passwordOk) {
            return {
              ok: false,
              error: "Incorrect password."
            };
          }
          const token = yield jwt.sign({
            id: user.id
          }, process.env.SECRET_KEY);
          return {
            ok: true,
            token
          };
          console.log(passwordOk);
        }();
      });
      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }
};