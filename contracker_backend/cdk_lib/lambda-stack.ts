import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Function as LambdaFunction,
  Code,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";

interface LambdaStackProps extends StackProps {
  contractsTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly contractsLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    // special configuration for python lambda as module
    //https://gist.github.com/gene1wood/06a64ba80cf3fe886053f0ca6d375bc0
    const contractsLambda = new LambdaFunction(this, "ContractsLambda", {
      code: Code.fromAsset(join(__dirname, "..", "services")),
      runtime: Runtime.PYTHON_3_10,
      handler: "contracts.index.lambda_handler",
      environment: {
        TABLE_NAME: props.contractsTable.tableName,
      },
    });

    contractsLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [props.contractsTable.tableArn],
        actions: [
          "dynamodb:PutItem",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
      })
    );

    this.contractsLambdaIntegration = new LambdaIntegration(contractsLambda);
  }
}
