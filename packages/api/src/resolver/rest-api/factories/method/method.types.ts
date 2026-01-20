import type { ClassResource } from '@lafkn/common';

import type { ApiLambdaMetadata, ApiResourceMetadata } from '../../../../main';
import type { CorsOptions } from '../../../resolver.types';

export interface CreateMethodProps {
  handler: ApiLambdaMetadata;
  resourceMetadata: ApiResourceMetadata;
  classResource: ClassResource;
  cors?: CorsOptions;
}
