import type { ClassResource } from '@lafken/common';

import type { QueryBuilderProps } from '../base/base.types';
import type { Item } from '../query-builder.types';

export interface CreateBuilderProps<E extends ClassResource>
  extends QueryBuilderProps<E> {
  item: Item<E>;
}
