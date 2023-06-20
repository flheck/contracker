import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { marshall } from "@aws-sdk/util-dynamodb";

// Custom
import { createResponse, createRandomId, parseJSON } from "../shared/utils";
import { validateAsContractEntry } from "../shared/validator";

export async function postHistoryContract(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const randomId = createRandomId();
  const item = parseJSON(event.body);
  item.id = randomId;
  validateAsContractEntry(item);

  const result = await ddbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: marshall(item as object),
    })
  );

  return createResponse(201, { id: randomId });
}
