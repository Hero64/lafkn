import {
  type ResolverPriority,
  type ResolverType,
  removeExportedFiles,
} from '@alicanto/resolver';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { App, TerraformStack } from 'cdktf';

import { StackConfig } from '../config/config';
import type { ModuleResource } from '../module/module.types';
import type { CreateAppProps } from './app.types';

const mapResolverPriority: Record<ResolverPriority, number> = {
  very_high: 5,
  high: 4,
  medium: 3,
  low: 2,
  very_low: 1,
};

export class AppStack extends TerraformStack {
  public config: StackConfig;
  constructor(
    scope: App,
    public readonly name: string,
    private props: CreateAppProps
  ) {
    super(scope, name);
    this.config = new StackConfig(this, props);
    new AwsProvider(scope, 'AWS');
  }

  async init() {
    const { resolvers } = this.props;

    await this.triggerHook(resolvers, 'beforeCreate');
    await this.resolveModuleResources();
    await this.triggerHook(resolvers, 'afterCreate');
  }

  private async triggerHook(
    resolvers: ResolverType[],
    trigger: 'beforeCreate' | 'afterCreate'
  ) {
    for (const resolver of resolvers) {
      if (resolver[trigger] !== undefined) {
        await resolver[trigger](this);
      }
    }
  }

  private async resolveModuleResources() {
    const { modules, resolvers } = this.props;
    const resolversByType = resolvers.reduce(
      (acc, resolver) => {
        acc[resolver.type] = resolver;
        return acc;
      },
      {} as Record<string, ResolverType>
    );
    const resources: ModuleResource[] = [];

    for (const module of modules) {
      const moduleResources = module();
      resources.push(...moduleResources);
    }

    const sortedResources = resources.sort((a, b) => {
      const priorityA = mapResolverPriority[resolversByType[a.metadata.type].priority];
      const priorityB = mapResolverPriority[resolversByType[b.metadata.type].priority];

      if (!priorityA || !priorityB) {
        throw new Error(`resolver type not found`);
      }

      return priorityB - priorityA;
    });

    for (const resource of sortedResources) {
      await resolversByType[resource.metadata.type].create(
        resource.module,
        resource.Resource
      );
    }
  }
}

export const createApp = async (props: CreateAppProps) => {
  try {
    const app = new App();
    const appStack = new AppStack(app, props.name, props);
    await appStack.init();

    return {
      app,
      appStack,
    };
  } finally {
    await removeExportedFiles();
  }
};
