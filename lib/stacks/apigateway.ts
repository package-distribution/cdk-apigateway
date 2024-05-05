import { Stack, StackProps } from 'aws-cdk-lib';
import { aws_apigateway as apigw } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { addCorsOptionsToResource } from '../utilities/cors';
export class ApiGatewayStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps, stage?: string) {
        super(scope, id, props);

        const api = new apigw.RestApi(this, "Package-Distribution", {
            cloudWatchRole: true,
            deploy: true,
            endpointTypes: [apigw.EndpointType.REGIONAL],
            deployOptions: {
                stageName: stage
            }
        });

        const rootResource = api.root.addResource("package");
        rootResource.addMethod("GET");
        rootResource.addMethod("POST");
        addCorsOptionsToResource(rootResource);
    }
}