import 'cdktf/lib/testing/adapters/jest';
import { enableBuildEnvVariable } from '@lafken/common';
import { type AppStack, setupTestingStackWithModule } from '@lafken/resolver';
import { Testing } from 'cdktf';
import { ApiResolver } from './resolver';
import { RestApi } from './rest-api/rest-api';

describe('Api Resolver', () => {
  enableBuildEnvVariable();
  it('should create a new rest api with default properties in before create hook', async () => {
    const { stack, module } = setupTestingStackWithModule();

    const resolver = new ApiResolver();

    await resolver.beforeCreate(module as AppStack);
    const synthesized = Testing.synth(stack);

    expect(synthesized).toHaveResourceWithProperties(RestApi, {
      name: 'test-general',
    });
  });

  it('should create a new rest api in before create hook', async () => {
    const { stack, module } = setupTestingStackWithModule();

    const resolver = new ApiResolver({
      restApi: {
        name: 'testing',
      },
    });

    await resolver.beforeCreate(module as AppStack);
    const synthesized = Testing.synth(stack);

    expect(synthesized).toHaveResourceWithProperties(RestApi, {
      name: 'testing',
    });
  });

  it('should create a new rest api in before create hook', async () => {
    const { stack, module } = setupTestingStackWithModule();

    const resolver = new ApiResolver({
      restApi: {
        name: 'testing',
      },
    });

    await resolver.beforeCreate(module as AppStack);
    const synthesized = Testing.synth(stack);

    expect(synthesized).toHaveResourceWithProperties(RestApi, {
      name: 'testing',
    });
  });
});
