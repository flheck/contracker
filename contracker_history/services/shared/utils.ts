import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { randomUUID } from "crypto";
import { JsonError } from "./validator";

export function createRandomId() {
  return randomUUID();
}

export function addCorsHeader(arg: APIGatewayProxyResult) {
  if (!arg.headers) {
    arg.headers = {};
  }
  arg.headers["Access-Control-Allow-Origin"] = "*";
  arg.headers["Access-Control-Allow-Methods"] = "*";
}

export function parseJSON(arg: string) {
  try {
    return JSON.parse(arg);
  } catch (error: any) {
    throw new JsonError(error.message);
  }
}

// body any cause of stringify
export function createResponse(statusCode: number, body: any) {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
}
