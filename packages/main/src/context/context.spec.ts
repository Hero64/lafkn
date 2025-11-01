import { ContextName, setupTestingStack } from '@alicanto/resolver';
import { AppContext } from './context';

describe('App context', () => {
  it('should create an application context', () => {
    const { stack } = setupTestingStack();
    new AppContext(stack, {
      contextCreator: ContextName.app,
      contextName: 'testing',
      globalConfig: {
        enableTrace: true,
        env: {
          foo: 'bar',
        },
        memory: 2000,
        runtime: 20,
      },
    });

    expect(stack.node.tryGetContext('testing')).toStrictEqual({
      contextCreator: 'app',
      enableTrace: true,
      env: {
        foo: 'bar',
      },
      memory: 2000,
      runtime: 20,
    });
  });
});
