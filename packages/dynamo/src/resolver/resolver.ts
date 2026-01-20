import type { ClassResource } from '@lafkn/common';
import type { AppModule, ResolverType } from '@lafkn/resolver';
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
