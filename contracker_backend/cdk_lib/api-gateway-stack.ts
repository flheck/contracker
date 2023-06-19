import { Stack, StackProps } from "aws-cdk-lib";
import {
  ApiDefinition,
  Cors,
  LambdaIntegration,
  ResourceOptions,
  RestApi,
  SpecRestApi,
} from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiGatewayStackProps extends StackProps {
  contractsLambdaIntegration: LambdaIntegration;
}

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    //swagger
    // //read in the yml-file to replace dynamic arn variable
    // const data = readFileSync(join(__dirname, "..", "services", "swagger_ui", "api_schema.yml"), "utf8");
    // const api_yaml = data.replace(/${LAMBDA_ARN}/g,  props.swaggerUiLambdaIntegration.handle);

    // const specApi = new SpecRestApi(this, "swagger-ui-api", {
    //   apiDefinition: ApiDefinition.fromAsset(

    //   ),
    // });

    // const swaggerResource = specApi.root.addResource("swagger");
    // swaggerResource.addMethod("GET", props.swaggerUiLambdaIntegration);

    // contracts
    const api = new RestApi(this, "ContractsApi");

    const optionsWithCors: ResourceOptions = {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    };

    const contractsResource = api.root.addResource(
      "contracts",
      optionsWithCors
    );

    contractsResource.addMethod("GET", props.contractsLambdaIntegration);
    contractsResource.addMethod("POST", props.contractsLambdaIntegration);
    contractsResource.addMethod("PUT", props.contractsLambdaIntegration);
    contractsResource.addMethod("DELETE", props.contractsLambdaIntegration);
  }
}
