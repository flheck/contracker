import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiGatewayStackProps extends StackProps {
  contractsLambdaIntegration: LambdaIntegration;
}

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "ContractsApi");

    const spacesResource = api.root.addResource("contracts");
    spacesResource.addMethod("GET", props.contractsLambdaIntegration);
    spacesResource.addMethod("POST", props.contractsLambdaIntegration);
    spacesResource.addMethod("PUT", props.contractsLambdaIntegration);
    spacesResource.addMethod("DELETE", props.contractsLambdaIntegration);
  }
}
