import type { ServicesName } from '@lafkn/common';
import type { ResolveResources } from '@lafkn/resolver';
import type { IntegrationOptionBase } from '../../../../../../main';

export type ServiceRoleName = `${ServicesName}.${'read' | 'write' | 'delete'}`;

export interface IntegrationOption {
  resolveResource: ResolveResources;
  options: IntegrationOptionBase;
}
