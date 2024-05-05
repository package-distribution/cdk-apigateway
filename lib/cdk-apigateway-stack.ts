import * as cdk from 'aws-cdk-lib';
import { aws_apigateway as apigw } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGatewayStack } from './stacks/apigateway';
export class CdkApigatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const stage = this.node.tryGetContext("stage");
    new ApiGatewayStack(this, "apigateway", props, stage);
  }
}
