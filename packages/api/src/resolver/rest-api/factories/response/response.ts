import type { ApiGatewayIntegration } from '@cdktf/provider-aws/lib/api-gateway-integration';
import { ApiGatewayIntegrationResponse } from '@cdktf/provider-aws/lib/api-gateway-integration-response';
import type { ApiGatewayMethod } from '@cdktf/provider-aws/lib/api-gateway-method';
import { ApiGatewayMethodResponse } from '@cdktf/provider-aws/lib/api-gateway-method-response';
import type { ResponseHandler } from '../../method/helpers/response/response.types';
import type { RestApi } from '../../rest-api';

export class ResponseFactory {
  constructor(private scope: RestApi) {}

  public createResponses(
    method: ApiGatewayMethod,
    integration: ApiGatewayIntegration,
    responses: ResponseHandler[],
    baseName: string
  ) {
    for (const response of responses) {
      const responseName = `${baseName}-${response.statusCode}`;

      const methodResponse = new ApiGatewayMethodResponse(
        this.scope,
        `${responseName}-method-response`,
        {
          httpMethod: method.httpMethod,
          resourceId: method.resourceId,
          restApiId: this.scope.api.id,
          statusCode: response.statusCode,
          responseParameters: response.methodParameters,
          dependsOn: [method],
          responseModels: response.field
            ? {
                'application/json': this.scope.modelFactory.getModel({
                  field: response.field,
                  defaultModelName: `${responseName}Model`,
                  dependsOn: [method],
                }).name,
              }
            : undefined,
        }
      );

      const integrationResponse = new ApiGatewayIntegrationResponse(
        this.scope,
        `${responseName}-integration-response`,
        {
          httpMethod: integration.httpMethod,
          resourceId: integration.resourceId,
          restApiId: this.scope.api.id,
          statusCode: response.statusCode,
          responseParameters: response.integrationParameters,
          selectionPattern: response.selectionPattern,
          responseTemplates: response.template
            ? {
                'application/json': response.template,
              }
            : undefined,
          dependsOn: [integration],
        }
      );

      this.scope.addDependency(methodResponse);
      this.scope.addDependency(integrationResponse);
    }
  }
}
