import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import path from "path";
import url from "url";
import { loadFiles } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const loadedTypeDefs = await loadFiles("".concat(__dirname, "/**/*.typeDefs.js"), {
  ignoreIndex: true,
  requireMethod: function () {
    var _requireMethod = _asyncToGenerator(function* (path) {
      return yield import(url.pathToFileURL(path));
    });
    function requireMethod(_x) {
      return _requireMethod.apply(this, arguments);
    }
    return requireMethod;
  }()
});
const loadedResolvers = await loadFiles("".concat(__dirname, "/**/*.resolvers.js"), {
  ignoreIndex: true,
  requireMethod: function () {
    var _requireMethod2 = _asyncToGenerator(function* (path) {
      return yield import(url.pathToFileURL(path));
    });
    function requireMethod(_x2) {
      return _requireMethod2.apply(this, arguments);
    }
    return requireMethod;
  }()
});
export const typeDefs = mergeTypeDefs(loadedTypeDefs);
export const resolvers = mergeResolvers(loadedResolvers);