export type OutputType = 'arn' | 'id';

export type GetResourceValue<T = string, V = OutputType> = (value: T, type: V) => any;
