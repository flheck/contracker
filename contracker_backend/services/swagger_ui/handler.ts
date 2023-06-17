import { APIGatewayProxyEvent, Context } from "aws-lambda";
import {
  APIGatewayClient,
  GetExportCommand,
} from "@aws-sdk/client-api-gateway";

// express
import express from "express";
import swaggerUI from "swagger-ui-express";
import serverless from "serverless-http";

const app = express();

const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
  //TODO: Correct return Type
): Promise<any> => {
  //TODO: Figure out how to access the credentials without setting envs explicit, since they should technically be existing and read in the lambda.
  const config = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
  };

  const client = new APIGatewayClient(config);
  const input = {
    exportType: "swagger",
    restApiId: event.requestContext.apiId,
    stageName: event.requestContext.stage,
    accepts: "application/json",
  };

  const command = new GetExportCommand(input);
  const response = await client.send(command);
   // As the response type is Unit8Array: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-api-gateway/interfaces/getexportcommandoutput.html
   // The body needs to be decoded first and than parsed: https://gist.github.com/johnbeech/8373a030685f2c216e9dca9e09e863a5
   const decodedBody = new TextDecoder().decode(response.body)
  let swaggerJson = JSON.parse(decodedBody);

  delete swaggerJson["paths"]["/api-docs/{proxy+}"];
  delete swaggerJson["paths"]["/api-docs"];

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));
  const handler = serverless(app);
  const ret = await handler(event, context);
  return ret;
};

export { handler };
