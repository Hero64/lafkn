import type { Construct } from 'constructs';

const resourceManager: Record<string, Construct> = {};

export const createResource = <T extends new (...args: any[]) => Construct>(
  StackResource: T,
  ...props: ConstructorParameters<T>
) => {
  const resource = new StackResource(...props);
  resourceManager[props[1]] = resource;
};
