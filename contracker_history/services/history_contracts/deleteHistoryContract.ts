import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// Custom
import { createResponse } from "../shared/utils";

export async function deleteHistoryContract(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters && "id" in event.queryStringParameters) {
    const historyContractId = event.queryStringParameters["id"];

    await ddbClient.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: historyContractId },
        },
      })
    );

    return createResponse(200, `Deleted Contract: ${historyContractId}`);
  }
  return createResponse(400, "Please provide right args!!");
}
