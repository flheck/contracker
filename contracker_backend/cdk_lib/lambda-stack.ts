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
import {
  ApiDefinition,
  LambdaIntegration,
  SpecRestApi,
} from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { readFileSync } from "fs";

interface LambdaStackProps extends StackProps {
  contractsTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly contractsLambdaIntegration: LambdaIntegration;
  public readonly swaggerUiLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    // Setup Contracts Lambda
    const contractsLambda = this.createContactLambda(this, props);
    this.addPolicyToContractLambda(contractsLambda, props);
    this.addSQSPolicyToContractLambda(contractsLambda);
    this.contractsLambdaIntegration = new LambdaIntegration(contractsLambda);

    // Setup SwaggerUI Lambda
    const swaggerUiLambda = this.createSwaggerUiLambda(this);

    //read in the yml-file to replace dynamic arn variable
    const data = readFileSync(
      join(__dirname, "..", "services", "swagger_ui", "api_schema.json"),
      "utf8"
    );
    const api_json = data.replace(
      /{SWAGGER_UI_HANDLER_ARN}/g,
      swaggerUiLambda.functionArn
    );

    const specApi = new SpecRestApi(this, "swagger-ui-api", {
      apiDefinition: ApiDefinition.fromInline(JSON.parse(api_json)),
    });
  }

  createContactLambda = (
    scope: Construct,
    props: LambdaStackProps
  ): LambdaFunction => {
    // special configuration for python lambda as module
    //https://gist.github.com/gene1wood/06a64ba80cf3fe886053f0ca6d375bc0
    const contractsLambda = new LambdaFunction(scope, "ContractsLambda", {
      code: Code.fromAsset(join(__dirname, "..", "services")),
      runtime: Runtime.PYTHON_3_10,
      handler: "contracts.index.lambda_handler",
      // Other way to add table name environment: https://stackoverflow.com/questions/74987459/get-the-name-of-a-dynamo-table-created-with-aws-cdk
      environment: {
        TABLE_NAME: props.contractsTable.tableName,
      },
    });
    return contractsLambda;
  };

  addPolicyToContractLambda = (
    lambda: LambdaFunction,
    props: LambdaStackProps
  ): void => {
    lambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [props.contractsTable.tableArn],
        actions: [
          "dynamodb:PutItem",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:BatchWriteItem",
        ],
      })
    );
  };

  addSQSPolicyToContractLambda = (lambda: LambdaFunction): void => {
    // TODO: delete hardcoded arn
    lambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [
          "arn:aws:sqs:eu-central-1:531201357882:HistoryContractLambdaStack-HistoryContractSqsQueue7121893E-Hx2CzpbHEAVI",
        ],
        actions: ["sqs:SendMessage"],
      })
    );
  };

  createSwaggerUiLambda = (scope: Construct): LambdaFunction => {
    const swaggerUiLambda = new NodejsFunction(scope, "SwaggerUiLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(__dirname, "..", "services", "swagger_ui", "handler.ts"),
    });

    return swaggerUiLambda;
  };
}
