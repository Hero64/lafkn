import {
  createEventDecorator,
  createFieldName,
  createPayloadDecorator,
  FieldProperties,
  getEventFields,
} from '@lafkn/common';
import { RESOURCE_TYPE } from '../api';
import type { ApiFieldMetadata } from '../field';
import type { HTTP_STATUS_CODE_NUMBER } from '../status';
import type { ResponseMetadata, ResponseProps } from './event.types';

export const apiPayloadKey = createFieldName(RESOURCE_TYPE, FieldProperties.payload);

export const Response = createPayloadDecorator<ResponseProps, ResponseMetadata>({
  createUniqueId: true,
  prefix: RESOURCE_TYPE,
  getMetadata: (props) => {
    if (!props?.responses) {
      return {
        defaultCode: props?.defaultCode,
      };
    }

    const responses: Partial<Record<string, ApiFieldMetadata | true>> = {};

    for (const responseCode in props?.responses) {
      const code = responseCode as unknown as HTTP_STATUS_CODE_NUMBER;
      responses[code] = true;

      if (props.responses[code] !== true) {
        responses[code] = getEventFields(
          RESOURCE_TYPE,
          props.responses[code],
          'response'
        ) as ApiFieldMetadata;
      }
    }

    return {
      responses,
      defaultCode: props?.defaultCode,
    };
  },
});

export const Payload = createPayloadDecorator({
  prefix: RESOURCE_TYPE,
  createUniqueId: true,
});

export const Event = (target: Function) =>
  createEventDecorator({ prefix: RESOURCE_TYPE })(target);
