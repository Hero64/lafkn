import { LambdaArgumentTypes, reflectArgumentMethod } from '@lafken/common';

export const Event = () => (target: any, methodName: string, _number: number) => {
  reflectArgumentMethod(target, methodName, LambdaArgumentTypes.event);
};
