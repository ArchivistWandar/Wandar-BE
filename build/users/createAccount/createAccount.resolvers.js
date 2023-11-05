import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import client from "../../client.js";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    createAccount: function () {
      var _createAccount = _asyncToGenerator(function (_, _ref) {
        let {
          name,
          username,
          email,
          password
        } = _ref;
        return function* () {
          //check if username, email is unique
          //hash password
          //save and return user
          try {
            const existingUser = yield client.user.findFirst({
              where: {
                OR: [{
                  username
                }, {
                  email
                }]
              }
            });
            if (existingUser) {
              throw new Error("This username/password is already taken.");
            }
            const uglyPassword = yield bcrypt.hash(password, 10);
            yield client.user.create({
              data: {
                name,
                username,
                email,
                password: uglyPassword
              }
            });
            return {
              ok: true
            };
          } catch (e) {
            return e;
          }
        }();
      });
      function createAccount(_x, _x2) {
        return _createAccount.apply(this, arguments);
      }
      return createAccount;
    }()
  }
};