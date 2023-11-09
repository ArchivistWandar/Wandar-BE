import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { Router } from "express";
import http from "http";
import cors from "cors";
import pkg from "body-parser";
const {
  json
} = pkg;
import { typeDefs, resolvers } from "./schema.js";
import { getUser } from "./users/users.utils.js";
import logger from "morgan";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { error } from "console";
_asyncToGenerator(function* () {
  const app = express();
  const PORT = 3000;
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/graphql'
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({
    schema,
    // As before, ctx is the graphql-ws Context where connectionParams live.
    // onConnect: async (ctx) => {
    //   // Check authentication every time a client connects.
    //   // if (!connectionParams.token) {
    //   //   // You can return false to close the connection  or throw an explicit error
    //   //   throw new Error("No authenticated token exists.")
    //   // }
    //   ctx.loggedInUser = await getUser(ctx.connectionParams.token)

    // },
    context: function () {
      var _context = _asyncToGenerator(function (_ref2) {
        let {
          connectionParams
        } = _ref2;
        return function* () {
          if (connectionParams) {
            return {
              loggedInUser: yield getUser(connectionParams.token)
            };
          }
        }();
      });
      function context(_x) {
        return _context.apply(this, arguments);
      }
      return context;
    }()
  }, wsServer);
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({
      httpServer
    }),
    // Proper shutdown for the WebSocket server.
    {
      serverWillStart() {
        return _asyncToGenerator(function* () {
          return {
            drainServer() {
              return _asyncToGenerator(function* () {
                yield serverCleanup.dispose();
              })();
            }
          };
        })();
      }
    }]
  });
  // const options = {
  //   origin: `http://localhost:${PORT}/graphql`, // 접근 권한을 부여하는 도메인
  //   credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  //   optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  // };

  yield apollo.start();
  app.use("/graphql", logger("tiny"),
  // cors(options),
  json(), graphqlUploadExpress(), expressMiddleware(apollo, {
    context: function () {
      var _context2 = _asyncToGenerator(function* (ctx) {
        if (ctx.req) {
          return {
            loggedInUser: yield getUser(ctx.req.headers.token)
          };
        }
      });
      function context(_x2) {
        return _context2.apply(this, arguments);
      }
      return context;
    }()
  }));

  //

  app.use("/static", express.static("uploads"));
  yield new Promise(resolve => httpServer.listen({
    port: PORT
  }, resolve));
  console.log("\uD83D\uDE80 Server ready at http://localhost:".concat(PORT, "/graphql"));
})();

// export const graphqlHandler = startServerAndCreateLambdaHandler(
//   server,
//   // We will be using the Proxy V2 handler
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
// );