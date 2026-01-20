import type { ResourceMetadata } from '@lafkn/common';
import type { EventCronMetadata } from '../../main';

export interface CronProps {
  resourceMetadata: ResourceMetadata;
  handler: EventCronMetadata;
}
