import type { GetResourceValue } from './output.types';
import type {
  ApiRestScopedNames,
  AuthScopedNames,
  BucketScopedNames,
  DynamoTableScopedNames,
  EventBusScopedNames,
  QueueScopedNames,
  StateMachineScopedNames,
} from './override-resources.types';

interface EvnFunctionProps {
  getResourceValue: GetResourceValue<
    | DynamoTableScopedNames
    | AuthScopedNames
    | BucketScopedNames
    | ApiRestScopedNames
    | EventBusScopedNames
    | StateMachineScopedNames
    | QueueScopedNames
  >;
}

type EvnFunction = (props: EvnFunctionProps) => Record<string, string>;

export type EnvironmentValue = Record<string, string> | EvnFunction;
