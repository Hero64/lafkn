import type { ClassResource } from '@lafken/common';

import type { QueryBuilderProps } from '../base/base.types';
import type { UpdateProps } from '../query-builder.types';

export interface UpdateBuilderProps<E extends ClassResource>
  extends QueryBuilderProps<E> {
  inputProps: UpdateProps<E>;
}
