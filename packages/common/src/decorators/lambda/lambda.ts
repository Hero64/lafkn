import 'reflect-metadata';
import { isBuildEnvironment } from '../../utils';
import {
  LambdaArgumentTypes,
  LambdaReflectKeys,
  type CallbackParam,
  type CreateLambdaDecoratorProps,
  type GetEventFields,
  type LambdaArguments,
  type LambdaArgumentsType,
} from './lambda.types';

const argumentsByType: LambdaArgumentsType = {
  [LambdaArgumentTypes.EVENT]: ({ event }) => event,
  [LambdaArgumentTypes.CALLBACK]: ({ callback }) => callback,
  [LambdaArgumentTypes.CONTEXT]: ({ context }) => context,
};

export const reflectArgumentMethod = (
  target: Function,
  methodName: string,
  type: LambdaArgumentTypes
) => {
  const properties: LambdaArguments =
    Reflect.getMetadata(LambdaReflectKeys.ARGUMENTS, target) || {};

  properties[methodName] = [type, ...(properties[methodName] || [])];
  Reflect.defineMetadata(LambdaReflectKeys.ARGUMENTS, properties, target);
};

export const createLambdaDecorator =
  <T, M>({
    getLambdaMetadata,
    descriptorValue,
    argumentParser,
  }: CreateLambdaDecoratorProps<T, M>) =>
  (props?: T) =>
  (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    if (isBuildEnvironment()) {
      const handlersMetadata: M[] =
        Reflect.getMetadata(LambdaReflectKeys.HANDLERS, target) || [];

      Reflect.defineMetadata(
        LambdaReflectKeys.HANDLERS,
        [...handlersMetadata, getLambdaMetadata(props || ({} as T), methodName)],
        target
      );
    }

    const lambdaArguments: LambdaArguments = Reflect.getMetadata(
      LambdaReflectKeys.ARGUMENTS,
      target
    );

    if (descriptorValue) {
      return descriptorValue(descriptor);
    }

    const { value: originalValue } = descriptor;

    const mapArgumentMethod = {
      ...argumentsByType,
      ...argumentParser,
    };

    descriptor.value = async (event: any, context: any, callback: CallbackParam) => {
      const methodArguments = (lambdaArguments?.[methodName] || []).map((argumentType) =>
        mapArgumentMethod[argumentType]({ event, context, methodName, target, callback })
      );

      const response = await originalValue.apply(this, methodArguments);
      return response;
    };
  };

const reflectEventMetadata = (
  target: any,
  methodName: string,
  key: LambdaReflectKeys,
  data: any
) => {
  const argumentsByMethod = Reflect.getMetadata(key, target) || {};
  Reflect.defineMetadata(
    key,
    {
      ...argumentsByMethod,
      ...(data ? { [methodName]: data } : {}),
    },
    target
  );
};

export const createEventDecorator =
  <E extends { new (...args: any[]): {} }>(getEventFields?: GetEventFields<E>) =>
  (FieldClass: E) =>
  (target: any, methodName: string, _number: number) => {
    reflectArgumentMethod(target, methodName, LambdaArgumentTypes.EVENT);

    if (!isBuildEnvironment() || !getEventFields) {
      return;
    }
    const { fields, additionalInformation } = getEventFields(FieldClass);

    reflectEventMetadata(target, methodName, LambdaReflectKeys.EVENT_PARAM, fields);

    if (additionalInformation) {
      reflectEventMetadata(
        target,
        methodName,
        LambdaReflectKeys.ADDITIONAL_EVENT_INFORMATION,
        additionalInformation
      );
    }
  };

export const Callback = () => (target: any, methodName: string, _number: number) => {
  reflectArgumentMethod(target, methodName, LambdaArgumentTypes.CALLBACK);
};

export const Context = () => (target: any, methodName: string, _number: number) => {
  reflectArgumentMethod(target, methodName, LambdaArgumentTypes.CONTEXT);
};
