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


const app = express();
const PORT = process.env.PORT;
const httpServer = http.createServer(app);
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
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
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
  })
);



app.use("/static", express.static("uploads"));

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);

// export const graphqlHandler = startServerAndCreateLambdaHandler(
//   server,
//   // We will be using the Proxy V2 handler
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
// );