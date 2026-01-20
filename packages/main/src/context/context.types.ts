import type { LambdaGlobalConfig } from '@lafkn/resolver';

export interface ContextProps {
  globalConfig?: LambdaGlobalConfig;
  contextCreator: string;
  contextName: string;
}
