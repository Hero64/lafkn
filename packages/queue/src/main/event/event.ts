import {
  createEventDecorator,
  createFieldDecorator,
  createPayloadDecorator,
} from '@alicanto/common';
import type { ParamProps, QueueParamMetadata } from './event.types';

// const attributeAllowedTypes = new Set<FieldTypes>(['String', 'Number']);
// const bodyParsedTypes = new Set<FieldTypes>(['String', 'Object', 'Array']);
// const bodyUnparsedTypes = new Set<FieldTypes>(['String']);

export const Payload = createPayloadDecorator({
  createUniqueId: false,
  enableInLambdaInvocation: true,
});

export const Param = createFieldDecorator<ParamProps, QueueParamMetadata>({
  enableInLambdaInvocation: true,
  getMetadata: ({ props }) => {
    const source = props?.source || 'attribute';
    // TODO: add validations in resolver
    /* 
    if (isBuildEnvironment()) {
      if (source === 'attribute' && !attributeAllowedTypes.has(metadata.type)) {
        throw new Error(
          `Attribute params only support ${[...attributeAllowedTypes].join(', ')} values`
        );
      }

      if (
        props?.source === 'body' &&
        props.parse &&
        !bodyParsedTypes.has(metadata.type)
      ) {
        throw new Error(
          `Body params only support ${[...bodyParsedTypes].join(', ')} values`
        );
      }

      if (
        props?.source === 'body' &&
        !props.parse &&
        !bodyUnparsedTypes.has(metadata.type)
      ) {
        throw new Error(
          `Body params only support ${[...bodyUnparsedTypes].join(', ')} values`
        );
      }
    }
      */

    return {
      source,
      parse: props?.source === 'body' && !!props?.parse,
    };
  },
});

export const Field = createFieldDecorator({
  getMetadata: () => ({}),
});

// export const Event =
//   (eventField: Function) => (target: any, methodName: string, index: number) => {
//     const decorator = createEventDecorator()(eventField)(target, methodName, index);

//     const params: QueueParamMetadata = Reflect.getMetadata(
//       LambdaReflectKeys.event_param,
//       target
//     )?.[methodName];

//     if (params?.type === 'Object') {
//       const bodyCount = params.properties.reduce((acc, field) => {
//         return field.source === 'body' ? acc + 1 : acc;
//       }, 0);
//       if (bodyCount >= 2) {
//         throw new Error('Queue event only support one body param');
//       }
//     }

//     return decorator;
//   };

export const Event = (eventField: Function) => createEventDecorator()(eventField);
