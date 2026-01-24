import type { ServicesName } from '@lafken/common';
import type { ResolveResources } from '@lafken/resolver';
import type { IntegrationOptionBase } from '../../../../../../main';

export type ServiceRoleName = `${ServicesName}.${'read' | 'write' | 'delete'}`;

export interface IntegrationOption {
  resolveResource: ResolveResources;
  options: IntegrationOptionBase;
}
