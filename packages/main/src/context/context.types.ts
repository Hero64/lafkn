import type { LambdaGlobalConfig } from '@alicanto/resolver';

export interface ContextProps {
  globalConfig?: LambdaGlobalConfig;
  contextCreator: string;
  contextName: string;
}
