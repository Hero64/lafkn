import type { ResourceMetadata } from '@lafken/common';
import type { EventCronMetadata } from '../../main';

export interface CronProps {
  resourceMetadata: ResourceMetadata;
  handler: EventCronMetadata;
}
