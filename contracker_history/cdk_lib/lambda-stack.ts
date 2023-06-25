import { Stack, StackProps, Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

interface LambdaStackProps extends StackProps {
  historyContractsTable: ITable;
  sqsEventSource: SqsEventSource;
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

    historyContractsLambda.addEventSource(props.sqsEventSource);

    this.historyContractsLambdaIntegration = new LambdaIntegration(
      historyContractsLambda
    );
  }
}
