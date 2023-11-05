import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { Router } from "express";
import http from "http";
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
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


(async() => {
  const app = express();
  const PORT = process.env.PORT;
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/graphql',
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer(

    {
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
      context: async ({ connectionParams }) => {
        if (connectionParams) {
          return {
            loggedInUser: await getUser(connectionParams.token)
          }
        }
      }
    },

    wsServer);

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],

  });
  // const options = {
  //   origin: `http://localhost:${PORT}/graphql`, // 접근 권한을 부여하는 도메인
  //   credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  //   optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  // };



  await apollo.start();


  app.use(
    "/graphql",
    logger("tiny"),
    // cors(options),
    json(),
    graphqlUploadExpress(),
    expressMiddleware(apollo, {
      context: async (ctx) => {
        if (ctx.req) {
          return {
            loggedInUser: await getUser(ctx.req.headers.token),
          };
        }
      },
    })
  );



  //


  app.use("/static", express.static("uploads"));

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
})()

// export const graphqlHandler = startServerAndCreateLambdaHandler(
//   server,
//   // We will be using the Proxy V2 handler
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
// );