import type { GlobalIndex } from '../../../main';

export interface GlobalIndexProperty
  extends Omit<GlobalIndex<any>, 'partitionKey' | 'sortKey'> {
  partitionKey: Set<string>;
  sortKey: Set<string>;
}
