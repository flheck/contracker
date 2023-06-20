import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

interface LambdaStackProps extends StackProps {
  historyContractsTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly historyContractsLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const historyContractsLambda = new NodejsFunction(
      this,
      "historyContractsLambda",
      {
        runtime: Runtime.NODEJS_18_X,
        handler: "handler",
        entry: join(
          __dirname,
          "..",
          "services",
          "history_contracts",
          "handler.ts"
        ),
        environment: {
          TABLE_NAME: props.historyContractsTable.tableName,
        },
      }
    );

    historyContractsLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [props.historyContractsTable.tableArn],
        actions: [
          "dynamodb:PutItem",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
      })
    );

    this.historyContractsLambdaIntegration = new LambdaIntegration(
      historyContractsLambda
    );
  }
}
