import type { ClassResource } from '@lafkn/common';
import type { StateMachineResourceMetadata } from '../../main';

export interface StateMachineProps {
  classResource: ClassResource;
  resourceMetadata: StateMachineResourceMetadata;
  moduleName: string;
}
