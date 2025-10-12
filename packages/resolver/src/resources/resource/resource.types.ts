import type { Construct } from 'constructs';

export interface DependentResource {
  resolveDependency: () => void;
  resource: Construct;
}
