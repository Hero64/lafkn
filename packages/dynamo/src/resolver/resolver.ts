import type { ClassResource } from '@lafken/common';
import type { AppModule, ResolverType } from '@lafken/resolver';
import { Table } from './table/table';

export class DynamoResolver implements ResolverType {
  public type = 'DYNAMODB';

  constructor(private models: ClassResource[]) {}

  public beforeCreate(scope: AppModule) {
    for (const bucket of this.models) {
      new Table(scope, {
        classResource: bucket,
      });
    }
  }

  public create() {
    throw new Error('It is not possible to parse this service');
  }
}
