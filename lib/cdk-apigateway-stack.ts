import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGatewayStack } from './stacks/apigateway';
export class CdkApigatewayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const stage = this.node.tryGetContext("stage");
    const stackName = `api-package-distribution-${stage}`;
    console.log(`Stack name - ${stackName}`);
    new ApiGatewayStack(this, stackName, props, stage);
  }
}
