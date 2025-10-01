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

export type OutputType = 'arn' | 'name' | 'url' | 'id';

export type GetResourceValue<T = string, V = OutputType> = (value: T, type: V) => any;

export type GetResourceServiceValue = GetResourceValue<
  | AuthNames
  | BucketNames
  | ApiRestNames
  | ApiAuthorizerNames
  | EventBusNames
  | DynamoDbNames
  | StateMachineScopedNames
  | QueueScopedNames
>;
