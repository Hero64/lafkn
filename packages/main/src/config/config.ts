import { type AppStack, Role, type StackConfigProps } from '@alicanto/resolver/';

import type { CreateAppProps } from '../app/app.types';

export class StackConfig implements StackConfigProps {
  public role: Role;
  public env: Record<string, any> = {};
  public minify?: boolean | undefined;
  public tags: Record<string, string> = {};

  constructor(
    scope: AppStack,
    protected params: Pick<CreateAppProps, 'name' | 'globalConfig'>,
    createDefaultRole: boolean = false
  ) {
    if (params.globalConfig?.lambda?.services || createDefaultRole) {
      this.role = new Role(scope, `${scope.name}-global-role`, {
        services: this.params.globalConfig?.lambda?.services || [
          'dynamodb',
          's3',
          'lambda',
          'cloudwatch',
          'sqs',
          'state_machine',
          'kms',
          'ssm',
          'event',
        ],
      });
    }
  }
}
