import "core-js/modules/es.promise.js";
import "core-js/modules/es.symbol.description.js";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import client from "../../client.js";
import { LAND_CREATED } from "../../constants.js";
import pubsub from "../../pubsub.js";
import { protectedResolver } from "../../users/users.utils.js";
export default {
  Mutation: {
    createLand: protectedResolver( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function (_, _ref2, _ref3) {
        let {
          landname
        } = _ref2;
        let {
          loggedInUser
        } = _ref3;
        return function* () {
          const existingLand = yield client.land.findFirst({
            where: {
              landname,
              userId: loggedInUser.id
            }
          });
          if (existingLand) {
            return {
              ok: false,
              error: "already existing landname."
            };
          }
          const newLand = yield client.land.create({
            data: {
              landname,
              user: {
                connect: {
                  id: loggedInUser.id
                }
              }
            }
          });
          yield pubsub.publish(LAND_CREATED, {
            landCreated: _objectSpread({}, newLand),
            landUpdated: _objectSpread({}, newLand)
          });
          if (newLand) {
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