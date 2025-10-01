import type { GetResourceValue } from './output.types';
import type {
  ApiAuthorizerNames,
  ApiRestNames,
  AuthNames,
  DynamoDbNames,
  EventBusNames,
  QueueScopedNames,
  BucketNames,
  StateMachineScopedNames,
} from './override-resources.types';

type EvnFunctionProps = {
  getResourceValue: GetResourceValue<
    | DynamoDbNames
    | AuthNames
    | BucketNames
    | ApiRestNames
    | ApiAuthorizerNames
    | EventBusNames
    | DynamoDbNames
    | StateMachineScopedNames
    | QueueScopedNames
  >;
};

type EvnFunction = (props: EvnFunctionProps) => string;

export type EnvironmentValue =
  | string
  | Record<string, string | number | boolean | EvnFunction>;
