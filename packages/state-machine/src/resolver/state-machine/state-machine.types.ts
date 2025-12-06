import type { ClassResource } from '@lafken/common';
import type { Role } from '@lafken/resolver';
import type { StateMachineResourceMetadata } from '../../main';

export interface StateMachineProps {
  classResource: ClassResource;
  role: Role;
  resourceMetadata: StateMachineResourceMetadata;
}
