import { isBuildEnvironment } from '../../utils';
import type { PayloadMetadata, PayloadProps } from './payload.types';

const modelPayloads: Record<string, number> = {};

export const createPayloadDecorator =
  <T extends PayloadProps, M extends PayloadMetadata>(
    setMetadata: (props: T, metadata: PayloadMetadata) => M,
    payloadKey: string,
    incrementId?: boolean,
    enableInLambdaInvocation = false
  ) =>
  (props?: T) =>
  (target: Function) => {
    if (isBuildEnvironment() || enableInLambdaInvocation) {
      const { name = target.name } = props || {};
      let id = name;
      if (incrementId) {
        modelPayloads[name] ??= 0;
        if (modelPayloads[name] > 0) {
          id = `${name}_${modelPayloads[name]}`;
        }
        modelPayloads[name]++;
      }

      const metadata = setMetadata(props as T, {
        id,
        name,
      });

      Reflect.defineMetadata(
        payloadKey,
        {
          ...(props || {}),
          ...metadata,
        },
        target
      );
    }
  };
