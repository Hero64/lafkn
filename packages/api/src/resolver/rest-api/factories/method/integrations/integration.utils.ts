import { ApiGatewayIntegration } from '@cdktf/provider-aws/lib/api-gateway-integration';
import { lafkenResource } from '@lafken/resolver';

export const LafkenIntegration = lafkenResource.make(ApiGatewayIntegration);
