import {
  createEventDecorator,
  createFieldDecorator,
  createFieldName,
  createPayloadDecorator,
  FieldProperties,
} from '@lafkn/common';
import { RESOURCE_TYPE } from '../queue';
import type { ParamProps, QueueParamMetadata } from './event.types';

export const queueFieldKey = createFieldName(RESOURCE_TYPE, FieldProperties.field);
export const queuePayloadKey = createFieldName(RESOURCE_TYPE, FieldProperties.payload);

export const Payload = createPayloadDecorator({
  prefix: RESOURCE_TYPE,
  createUniqueId: false,
  enableInLambdaInvocation: true,
});

export const Param = createFieldDecorator<ParamProps, QueueParamMetadata>({
  prefix: RESOURCE_TYPE,
  enableInLambdaInvocation: true,
  getMetadata: (props) => {
    const source = props?.source || 'attribute';

    return {
      source,
      parse: props?.source === 'body' && !!props?.parse,
    };
  },
});

export const Field = createFieldDecorator({
  prefix: RESOURCE_TYPE,
  enableInLambdaInvocation: true,
  getMetadata: () => ({}),
});

export const Event = (eventField: Function) =>
  createEventDecorator({
    prefix: RESOURCE_TYPE,
    enableInLambdaInvocation: true,
  })(eventField);
