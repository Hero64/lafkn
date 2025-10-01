import { getResourceMetadata } from '@alicanto/common';

import type { AppStack } from '../app/app';
import { StackConfig } from '../config/config';
import type { CreateModuleProps, ModuleResource } from './module.types';

export class StackModule {
  public config: StackConfig;
  constructor(
    public readonly app: AppStack,
    public readonly name: string,
    protected props: CreateModuleProps
  ) {
    this.config = new StackConfig(
      app,
      {
        name,
        globalConfig: props.globalConfig,
      },
      false
    );
  }

  getModuleResources(): ModuleResource[] {
    const { resources } = this.props;

    return resources.map((resource) => ({
      module: this,
      Resource: resource,
      metadata: getResourceMetadata(resource),
    }));
  }
}

export const createModule = (props: CreateModuleProps) => (scope: AppStack) => {
  const module = new StackModule(scope, props.name, props);

  return module.getModuleResources();
};
