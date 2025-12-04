import 'reflect-metadata';
import {
  createLambdaDecorator,
  createResourceDecorator,
  type LambdaArgumentsType,
  LambdaArgumentTypes,
  LambdaReflectKeys,
} from '@alicanto/common';
import type { SQSEvent, SQSRecord } from 'aws-lambda';
import type { QueueParamMetadata } from '../event/event.types';
import type { FifoProps, QueueLambdaMetadata, StandardProps } from './queue.types';

export const RESOURCE_TYPE = 'QUEUE' as const;

export const Queue = createResourceDecorator({
  type: RESOURCE_TYPE,
  callerFileIndex: 5,
});

const getValueFromAttribute = (param: QueueParamMetadata, record: SQSRecord) => {
  const value = record.messageAttributes[param.name];
  if (!value) {
    return;
  }

  if (param.type === 'Number') {
    return Number(value.stringValue);
  }

  return value.stringValue;
};

const getValueFormBody = (param: QueueParamMetadata, record: SQSRecord) => {
  const value = record.body;
  if (!value || !param.parse) {
    return value;
  }

  return JSON.parse(String(value))?.[param.name];
};

const argumentParser: Partial<LambdaArgumentsType> = {
  [LambdaArgumentTypes.event]: ({ event, methodName, target }) => {
    const queueEvent: SQSEvent = event;

    const data: any = [];
    const params: Record<string, QueueParamMetadata> =
      Reflect.getMetadata(LambdaReflectKeys.event_param, target) || {};

    const paramsByHandler = params[methodName];

    if (!event || !queueEvent.Records || !paramsByHandler) {
      return event;
    }

    for (const record of queueEvent.Records) {
      const attributes: any = {};
      if (paramsByHandler.type !== 'Object') {
        continue;
      }
      for (const param of paramsByHandler.properties) {
        attributes[param.destinationName] =
          param.source === 'attribute'
            ? getValueFromAttribute(param, record)
            : getValueFormBody(param, record);
      }
      data.push(attributes);
    }

    return data;
  },
};

export const Standard = createLambdaDecorator<StandardProps, QueueLambdaMetadata>({
  getLambdaMetadata: (props, methodName) => ({
    ...props,
    queueName: props.queueName || methodName,
    name: methodName,
    isFifo: false,
  }),
  argumentParser,
});

export const Fifo = createLambdaDecorator<FifoProps, QueueLambdaMetadata>({
  getLambdaMetadata: (props, methodName) => ({
    ...props,
    queueName: props.queueName || methodName,
    name: methodName,
    isFifo: true,
  }),
  argumentParser,
});
