import type { GetResourceProps } from './resource.types';

type EvnFunction = (props: GetResourceProps) => Record<string, string>;

export type EnvironmentValue = Record<string, string> | EvnFunction;
