import type { ResourceIdentifiers, ScopedResourceNames } from './utilities.types';

export interface StacksAvailable {}
export interface AuthAvailable {}
export interface BucketAvailable {}
export interface ApiRestAvailable {}
export interface ApiAuthorizerAvailable {}
export interface EventBusAvailable {}
export interface DynamoDBAvailable {}
export interface QueueAvailable {}

type ResourceNames<T> = keyof T | (string & {});
type StackResourceName<T, S extends string> =
  | `${S}::${Extract<keyof T, string | number>}`
  | (string & {});

export type StackNames = ResourceNames<StacksAvailable>;
export type AuthNames = ResourceNames<AuthAvailable>;
export type AuthRestScopedNames = StackResourceName<AuthAvailable, 'auth'>;
export type BucketNames = ResourceNames<BucketAvailable>;
export type BucketScopedNames = StackResourceName<ApiRestAvailable, 'bucket'>;
export type ApiRestNames = ResourceNames<ApiRestAvailable>;
export type ApiRestScopedNames = StackResourceName<ApiRestAvailable, 'rest-api'>;
export type ApiAuthorizerNames = ResourceNames<ApiAuthorizerAvailable>;
export type ApiAuthorizerScopedNames = StackResourceName<
  ApiAuthorizerAvailable,
  'api-authorizer'
>;
export type EventBusNames = ResourceNames<EventBusAvailable>;
export type EventBusScopedNames = StackResourceName<ApiRestAvailable, 'event-bus'>;
export type DynamoDbNames = ResourceNames<DynamoDBAvailable>;
export type DynamoDbScopedNames = StackResourceName<DynamoDBAvailable, 'dynamo'>;

export type StateMachineNames =
  | ResourceIdentifiers<StacksAvailable, 'StateMachine'>
  | (string & {});
export type StateMachineScopedNames = ScopedResourceNames<
  StacksAvailable,
  'StateMachine'
>;

export type QueueNames = ResourceIdentifiers<QueueAvailable, 'Queue'> | (string & {});
export type QueueScopedNames = ScopedResourceNames<QueueAvailable, 'queue'>;
