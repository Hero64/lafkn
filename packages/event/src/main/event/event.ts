import { LambdaArgumentTypes, reflectArgumentMethod } from '@lafkn/common';

export const Event = () => (target: any, methodName: string, _number: number) => {
  reflectArgumentMethod(target, methodName, LambdaArgumentTypes.event);
};
