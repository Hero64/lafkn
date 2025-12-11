import type { ClassResource } from '@lafken/common';
import type { QueryBuilderProps } from '../base/base.types';
import type { DynamoIndexes } from '../dynamo-index/dynamo-index';
import type { QueryProps } from '../query-builder.types';

export interface FindBuilderProps<E extends ClassResource> extends QueryBuilderProps<E> {
  inputProps: QueryProps<E>;
  indexes: DynamoIndexes;
}
