import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// Custom
import { createResponse } from "../shared/utils";

export async function updateHistoryContract(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (
    event.queryStringParameters &&
    "id" in event.queryStringParameters &&
    event.body
  ) {
    const parsedBody = JSON.parse(event.body);
    const historyContractId = event.queryStringParameters["id"];

    let response = undefined;
    for (const key in parsedBody) {
      response = await ddbClient.send(
        new UpdateItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: historyContractId },
          },
          UpdateExpression: "set #zzzNew = :new",
          ExpressionAttributeValues: {
            ":new": {
              S: parsedBody[key],
            },
          },
          ExpressionAttributeNames: {
            "#zzzNew": key,
          },
          ReturnValues: "UPDATED_NEW",
        })
      );
    }

    return createResponse(204, response);
  }

  return createResponse(400, "Please provide right args!!");
}
