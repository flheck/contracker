import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

// Custom
import { createResponse } from "../shared/utils";

export async function getHistoryContract(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters) {
    if ("id" in event.queryStringParameters) {
      const historyContractId = event.queryStringParameters["id"];
      const getItemResponse = await ddbClient.send(
        new GetItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: historyContractId },
          },
        })
      );
      if (getItemResponse.Item) {
        const unmashalledItem = unmarshall(getItemResponse.Item);
        return createResponse(200, unmashalledItem);
      } else {
        return createResponse(
          404,
          `History Contract with id ${historyContractId} not found!`
        );
      }
    } else {
      return createResponse(400, "Id required!");
    }
  }

  const result = await ddbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );

  const unmashalledItems = result.Items?.map((item) => unmarshall(item));
  return createResponse(201, unmashalledItems);
}
