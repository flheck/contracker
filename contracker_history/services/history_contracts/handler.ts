import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  SQSEvent,
} from "aws-lambda";

// Custom
import { getHistoryContract } from "./getHistoryContract";
import { postHistoryContract } from "./postHistoryContract";
import { updateHistoryContract } from "./updateHistoryContract";
import { deleteHistoryContract } from "./deleteHistoryContract";
import { postSQSHistoryContract } from "./postSQSHistoryContract";
import { JsonError, MissingFieldError } from "../shared/validator";
import { addCorsHeader, createResponse } from "../shared/utils";

// Init DynamoDb outside
const ddbClient = new DynamoDBClient({});

async function handler(
  event: any, //APIGatewayProxyEvent | SQSEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let response: APIGatewayProxyResult = createResponse(502, "Internal Error");
  console.log("Event:", event, context);

  if ("Records" in event && event.Records[0].eventSource === "aws:sqs") {
    try {
      response = await postSQSHistoryContract(event.Records[0].body, ddbClient);
      return response;
    } catch (error: any) {
      return createResponse(200, error.message);
    }
  }

  try {
    switch (event.httpMethod) {
      case "GET":
        response = await getHistoryContract(event, ddbClient);
        break;
      case "POST":
        response = await postHistoryContract(event, ddbClient);
        break;
      case "PUT":
        response = await updateHistoryContract(event, ddbClient);
        break;
      case "DELETE":
        response = await deleteHistoryContract(event, ddbClient);
        break;
      default:
        break;
    }
  } catch (error: any) {
    if (error instanceof MissingFieldError) {
      return createResponse(400, error.message);
    }
    if (error instanceof JsonError) {
      return createResponse(400, error.message);
    }
    return createResponse(500, error.message);
  }

  addCorsHeader(response);
  return response;
}

export { handler };
