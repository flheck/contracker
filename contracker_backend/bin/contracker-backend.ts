#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { LambdaStack } from "../cdk_lib/lambda-stack";
import { DataStack } from "../cdk_lib/data-stack";
import { ApiGatewayStack } from "../cdk_lib/api-gateway-stack";

const app = new App();
const dataStack = new DataStack(app, "DataStack");
const lambdaStack = new LambdaStack(app, "LambdaStack", {
  contractsTable: dataStack.contractsTable,
});
new ApiGatewayStack(app, "ApiStack", {
  contractsLambdaIntegration: lambdaStack.contractsLambdaIntegration
});

