import type { ClassResource } from '@lafkn/common';

import type { BatchWriteBuilderProps } from '../batch-write/batch-write.types';

export interface BulkCreateBuilderProps<E extends ClassResource>
  extends Omit<BatchWriteBuilderProps<E>, 'generateBatchCommand'> {}
