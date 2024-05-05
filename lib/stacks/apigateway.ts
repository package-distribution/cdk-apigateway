import * as cdk from 'aws-cdk-lib';
import { aws_apigateway as apigw } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { addCorsOptionsToResource } from '../utilities/cors';
export class ApiGatewayStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps, stage?: string) {
        super(scope, id, props);
        const api = new apigw.RestApi(this, "package", {
            cloudWatchRole: true,
            deploy: true,
            endpointTypes: [apigw.EndpointType.REGIONAL],
            deployOptions: {
                stageName: stage
            }
        });
        const root = api.root.addResource("package");
        root.addMethod("GET");
        root.addMethod("POST");
        addCorsOptionsToResource(root);
    }
}