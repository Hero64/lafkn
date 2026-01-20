import { ApiGatewayIntegration } from '@cdktf/provider-aws/lib/api-gateway-integration';
import { lafknResource } from '@lafkn/resolver';

export const LafknIntegration = lafknResource.make(ApiGatewayIntegration);
