import type { ClassResource } from '@lafkn/common';
import type { BucketProps as BucketMainProps } from '../../main';

export interface BucketGlobalConfig extends Omit<BucketMainProps, 'name' | 'tracing'> {}

export interface BucketProps extends BucketGlobalConfig {
  classResource: ClassResource;
}
