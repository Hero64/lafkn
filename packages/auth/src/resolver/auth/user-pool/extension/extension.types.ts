import type { ResourceMetadata } from '@lafken/common';
import type { TriggerMetadata } from '../../../../main/extension/extension.types';

export interface ExtensionProps {
  resourceMetadata: ResourceMetadata;
  handlers: TriggerMetadata[];
}
