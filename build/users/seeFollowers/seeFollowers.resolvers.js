import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import client from "../../client.js";
export default {
  Query: {
    seeFollowers: function () {
      var _seeFollowers = _asyncToGenerator(function (_, _ref) {
        let {
          username,
          page
        } = _ref;
        return function* () {
          const ok = client.user.findUnique({
            where: {
              username
            },
            select: {
              id: true
            }
          }); //select: 데이터베이스에서 username 외 불필요한 정보를 불러오지 X
          console.log(ok);
          if (!ok) {
            return {
              ok: false,
              error: "사용자를 찾을 수 없습니다."
            };
          }
          const followers = yield client.user.findUnique({
            where: {
              username
            }
          }).followers({
            take: 2,
            skip: (page - 1) * 2
          });
          const totalFollowers = yield client.user.count({
            where: {
              following: {
                some: {
                  username
                }
              }
            }
          });
          return {
            ok: true,
            followers,
            totalPages: Math.ceil(totalFollowers / 2)
          };
        }();
      });
      function seeFollowers(_x, _x2) {
        return _seeFollowers.apply(this, arguments);
      }
      return seeFollowers;
    }()
  }
};