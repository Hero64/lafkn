import { createLambdaDecorator, createResourceDecorator } from '@lafken/common';

import type { ExtensionsProps, TriggerMetadata, TriggerProps } from './extension.types';

export const RESOURCE_TYPE = 'AUTHENTICATION' as const;

export const AuthExtension = (props?: ExtensionsProps) =>
  createResourceDecorator({
    callerFileIndex: 5,
    type: RESOURCE_TYPE,
    getMetadata: (props) => props,
  })(props);

export const Trigger = (props: TriggerProps) =>
  createLambdaDecorator<TriggerProps, TriggerMetadata>({
    getLambdaMetadata: (props, name) => ({
      name,
      ...props,
    }),
  })(props);
