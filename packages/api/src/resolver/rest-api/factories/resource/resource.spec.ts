import 'cdktf/lib/testing/adapters/jest';
import { enableBuildEnvVariable } from '@alicanto/common';
import { ApiGatewayResource } from '@cdktf/provider-aws/lib/api-gateway-resource';
import { Testing } from 'cdktf';
import { setupTestingRestApi } from '../../../utils/testing.utils';

describe('Resource factory', () => {
  enableBuildEnvVariable();
  it('should create a resource', () => {
    const { restApi, stack } = setupTestingRestApi();

    restApi.resourceFactory.getResource('foo/bar');

    const synthesized = Testing.synth(stack);

    expect(synthesized).toHaveResourceWithProperties(ApiGatewayResource, {
      path_part: 'foo',
    });
    expect(synthesized).toHaveResourceWithProperties(ApiGatewayResource, {
      path_part: 'bar',
    });
  });
});
