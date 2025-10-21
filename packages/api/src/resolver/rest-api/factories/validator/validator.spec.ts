import 'cdktf/lib/testing/adapters/jest';
import { enableBuildEnvVariable } from '@alicanto/common';
import { ApiGatewayRequestValidator } from '@cdktf/provider-aws/lib/api-gateway-request-validator';
import { Testing } from 'cdktf';
import { setupTestingRestApi } from '../../../utils/testing.utils';

describe('Validator factory', () => {
  enableBuildEnvVariable();
  it('should create a resource', () => {
    const { restApi, stack } = setupTestingRestApi();

    restApi.validatorFactory.getValidator({
      validateRequestBody: true,
      validateRequestParameters: false,
    });

    const synthesized = Testing.synth(stack);

    expect(synthesized).toHaveResourceWithProperties(ApiGatewayRequestValidator, {
      name: 'true-false',
      validate_request_body: true,
      validate_request_parameters: false,
    });
  });
});
