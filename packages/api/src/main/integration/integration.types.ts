import type {
  BucketNames,
  DynamoTableScopedNames,
  GetResourceValue,
  OnlyNumberString,
  OnlyOne,
  QueueScopedNames,
  StateMachineScopedNames,
} from '@alicanto/common';

export interface IntegrationOptionBase<T = string, V = 'arn' | 'id'> {
  getResourceValue: GetResourceValue<T, V>;
  getCurrentDate: () => string;
}

export interface BucketIntegrationResponse {
  bucket: string;
  object: string;
}
/**
 * Bucket
 */
export type BucketIntegrationOption = IntegrationOptionBase<BucketNames>;

/**
 * State Machine
 */
export interface StateMachineStartIntegrationResponse<T = any> {
  stateMachineArn: string;
  input: T;
}

export interface StateMachineStatusIntegrationResponse {
  executionArn: string;
}

export interface StateMachineStopIntegrationResponse
  extends StateMachineStatusIntegrationResponse {}

export type StateMachineIntegrationOption =
  IntegrationOptionBase<StateMachineScopedNames>;

/**
 * Dynamo DB
 */
export type DynamoIntegrationOption = IntegrationOptionBase<DynamoTableScopedNames>;

interface DynamoIntegrationBase {
  tableName: string;
}

interface DynamoIntegrationPartitionBase<T = any> extends DynamoIntegrationBase {
  partitionKey: OnlyOne<OnlyNumberString<Required<T>>>;
  sortKey?: Partial<OnlyOne<OnlyNumberString<Required<T>>>>;
}

export interface DynamoQueryIntegrationResponse<T = any>
  extends DynamoIntegrationPartitionBase<T> {
  indexName?: string;
}

export interface DynamoPutIntegrationResponse<T = any> extends DynamoIntegrationBase {
  data: T;
  validateExistKeys?:
    | [keyof OnlyNumberString<Required<T>>, keyof OnlyNumberString<Required<T>>]
    | [keyof OnlyNumberString<Required<T>>];
}
export interface DynamoDeleteIntegrationResponse<T = any>
  extends DynamoIntegrationPartitionBase<T> {}

/**
 * SQS queue
 */

export type QueueIntegrationOption = IntegrationOptionBase<
  QueueScopedNames,
  'id' | 'arn' | 'name'
>;
export interface QueueSendMessageIntegrationResponse {
  queueName: string;
  attributes?: Partial<Record<string, string | number>>;
  body?: any;
}
