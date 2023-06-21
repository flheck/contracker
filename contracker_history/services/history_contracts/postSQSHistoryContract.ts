import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { marshall } from "@aws-sdk/util-dynamodb";

// Custom
import { createResponse, parseJSON } from "../shared/utils";
import { validateAsContractEntry } from "../shared/validator";

export async function postSQSHistoryContract(
  body: any,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const item = parseJSON(body);
  console.log(item);
  validateAsContractEntry(item);

  const result = await ddbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: marshall(item as object),
    })
  );

  return createResponse(201, { id: item.id });
}
