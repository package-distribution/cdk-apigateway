import * as cdk from 'aws-cdk-lib';
import { aws_apigateway as apigw } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { addCorsOptionsToResource } from '../utilities/cors';
export class ApiGatewayStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps, stage?: string) {
        super(scope, id, props);

        const api = new apigw.RestApi(this, "Package", {
            cloudWatchRole: true,
            deploy: true,
            endpointTypes: [apigw.EndpointType.REGIONAL],
            deployOptions: {
                stageName: stage
            },
            defaultCorsPreflightOptions: {
                allowOrigins: apigw.Cors.ALL_ORIGINS,
                allowMethods: apigw.Cors.ALL_METHODS
            }
        });

        const rootResource = api.root.addResource("package");
        rootResource.addMethod("GET");
        rootResource.addMethod("POST");
        addCorsOptionsToResource(rootResource);
    }
}