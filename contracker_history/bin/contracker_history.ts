#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { LambdaStack } from "../cdk_lib/lambda-stack";
import { DataStack } from "../cdk_lib/data-stack";
import { ApiGatewayStack } from "../cdk_lib/api-gateway-stack";

const app = new App();
const dataStack = new DataStack(app, "HistoryContractDataStack");
const lambdaStack = new LambdaStack(app, "HistoryContractLambdaStack", {
  historyContractsTable: dataStack.historyContractsTable,
});
new ApiGatewayStack(app, "HistoryContractApiStack", {
  historyContractsLambdaIntegration:
    lambdaStack.historyContractsLambdaIntegration,
});
