import {
  type ClassResource,
  Context,
  createEventDecorator,
  createFieldDecorator,
  createFieldName,
  createPayloadDecorator,
  FieldProperties,
} from '@lafken/common';
import { RESOURCE_TYPE } from '../state-machine';
import type { JsonAtaString, ParamProps, StateMachineParamMetadata } from './param.types';

export const stateMachineFieldKey = createFieldName(RESOURCE_TYPE, FieldProperties.field);
export const stateMachinePayloadKey = createFieldName(
  RESOURCE_TYPE,
  FieldProperties.payload
);

/**
 * Event decorator.
 *
 * Decorates a function parameter to specify that it will receive an event.
 * The event data can come from either:
 * - A class decorated with `@Payload`, which maps the incoming data to the class structure.
 * - A JSONata expression as a string, allowing dynamic extraction or transformation of the event data.
 */
export const Event = <E extends ClassResource | JsonAtaString>(FieldClass: E) =>
  createEventDecorator({ prefix: RESOURCE_TYPE })(FieldClass);

export const Payload = createPayloadDecorator({
  prefix: RESOURCE_TYPE,
  createUniqueId: false,
});

export const IntegrationOptions = Context;

export const Param = createFieldDecorator<ParamProps, StateMachineParamMetadata>({
  prefix: RESOURCE_TYPE,
  getMetadata: (props) => props as StateMachineParamMetadata,
});
