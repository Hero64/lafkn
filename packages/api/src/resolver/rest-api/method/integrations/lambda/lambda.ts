import { LambdaHandler } from '@alicanto/resolver';
import { ApiGatewayIntegration } from '@cdktf/provider-aws/lib/api-gateway-integration';
import { Construct } from 'constructs';
import type { Integration, IntegrationProps } from '../integration.types';

export class LambdaIntegration extends Construct implements Integration {
  constructor(
    scope: Construct,
    private props: IntegrationProps
  ) {
    super(scope, 'lambda-integration');
  }

  async create() {
    const {
      handler,
      resourceMetadata,
      restApi,
      apiGatewayMethod,
      responseHelper,
      paramHelper,
      templateHelper,
    } = this.props;

    const lambdaHandler = new LambdaHandler(
      this,
      `${handler.name}-${resourceMetadata.name}`,
      {
        ...handler,
        filename: resourceMetadata.filename,
        pathName: resourceMetadata.foldername,
        minify: resourceMetadata.minify,
        principal: 'apigateway.amazonaws.com',
        suffix: 'api',
      }
    );

    const lambda = await lambdaHandler.generate();

    const integration = new ApiGatewayIntegration(
      restApi,
      `${resourceMetadata.name}-${handler.name}-integration`,
      {
        httpMethod: apiGatewayMethod.httpMethod,
        resourceId: apiGatewayMethod.resourceId,
        restApiId: restApi.api.id,
        type: 'AWS',
        uri: lambda.invokeArn,
        integrationHttpMethod: 'POST',
        dependsOn: [apiGatewayMethod],
        requestTemplates: paramHelper.params
          ? {
              'application/json': templateHelper.generateTemplate({
                field: paramHelper.params,
              }),
            }
          : undefined,
      }
    );

    restApi.responseFactory.createResponses(
      apiGatewayMethod,
      integration,
      responseHelper.handlerResponse,
      `${resourceMetadata.name}-${handler.name}`
    );

    return integration;
  }
}
