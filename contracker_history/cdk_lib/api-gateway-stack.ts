import { Stack, StackProps } from "aws-cdk-lib";
import {
  Cors,
  LambdaIntegration,
  ResourceOptions,
  RestApi,
  SpecRestApi,
} from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiGatewayStackProps extends StackProps {
  historyContractsLambdaIntegration: LambdaIntegration;
}

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "HistoryContractsApi");

    const optionsWithCors: ResourceOptions = {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    };

    const historyContractsResource = api.root.addResource(
      "history_contracts",
      optionsWithCors
    );

    historyContractsResource.addMethod(
      "GET",
      props.historyContractsLambdaIntegration
    );
    historyContractsResource.addMethod(
      "POST",
      props.historyContractsLambdaIntegration
    );
    historyContractsResource.addMethod(
      "PUT",
      props.historyContractsLambdaIntegration
    );
    historyContractsResource.addMethod(
      "DELETE",
      props.historyContractsLambdaIntegration
    );
  }
}
