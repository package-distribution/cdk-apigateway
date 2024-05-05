import { MockIntegration, PassthroughBehavior, IResource } from "aws-cdk-lib/aws-apigateway";

export function addCorsOptionsToResource(resource: IResource) {
    const corsHeaders = [
        'Content-Type',
        'X-Amz-Date',
        'Authorization',
        'X-Api-Key',
        'X-Amz-Security-Token',
        'X-Amz-User-Agent'
    ];
    const corsMethods = ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'];
    const corsResponseParameters = {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Access-Control-Allow-Origin': true,
    };

    resource.addMethod('OPTIONS', new MockIntegration({
        passthroughBehavior: PassthroughBehavior.NEVER,
        integrationResponses: [{
            statusCode: '200',
            responseParameters: {
                'method.response.header.Access-Control-Allow-Headers': `'${corsHeaders.join(',')}'`,
                'method.response.header.Access-Control-Allow-Origin': "'*'",
                'method.response.header.Access-Control-Allow-Credentials': "'false'",
                'method.response.header.Access-Control-Allow-Methods': `'${corsMethods.join(',')}'`,
            },
        }],
        requestTemplates: { "application/json": "{\"statusCode\": 200}" },
    }), {
        methodResponses: [{
            statusCode: '200',
            responseParameters: corsResponseParameters,
        }]
    });
}