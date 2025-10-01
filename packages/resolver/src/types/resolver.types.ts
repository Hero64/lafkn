import type { ClassResource } from '@alicanto/common';
import type { TerraformStack } from 'cdktf';
import type { Role } from '../resources';

export interface StackConfigProps {
  role: Role;
  env: Record<string, any>;
  minify?: boolean;
  tags: Record<string, string>;
}

export interface AppStack extends TerraformStack {
  name: string;
  config: StackConfigProps;
}

export interface AppModule {
  name: string;
  app: AppStack;
  config?: StackConfigProps;
}

export type ResolverPriority = 'very_high' | 'high' | 'medium' | 'low' | 'very_low';

export interface ResolverType {
  type: string;
  priority: ResolverPriority;
  beforeCreate?: (scope: AppStack) => Promise<void>;
  create: (module: Required<AppModule>, resource: ClassResource) => Promise<void>;
  afterCreate?: (scope: AppStack) => Promise<void>;
}
