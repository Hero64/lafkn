import { getPrimitiveType } from '@alicanto/common';
import {
  type DynamoModelProps,
  type FieldProps,
  type FieldsMetadata,
  ModelMetadataKeys,
} from './model.types';

export const Model =
  <T extends Function>(props: DynamoModelProps<T> = {}) =>
  (constructor: T) => {
    const { name = constructor.name, indexes = [], ...dynamoProps } = props;

    Reflect.defineMetadata(
      ModelMetadataKeys.model,
      {
        ...dynamoProps,
        name,
        indexes,
      },
      constructor
    );
  };

export const Field =
  (props: FieldProps = {}) =>
  (constructor: any, name: string) => {
    const { type: fieldType } = props;

    const fields: FieldsMetadata[] =
      Reflect.getMetadata(ModelMetadataKeys.fields, constructor) || {};
    const type = fieldType
      ? getPrimitiveType(fieldType) || 'Object'
      : Reflect.getMetadata('design:type', constructor, name).name;

    Reflect.defineMetadata(
      ModelMetadataKeys.fields,
      {
        ...fields,
        [name]: {
          name,
          type,
        },
      },
      constructor
    );
  };

export const PartitionKey =
  (type: StringConstructor | NumberConstructor) => (constructor: any, name: string) => {
    Field({ type })(constructor, name);
    Reflect.defineMetadata(ModelMetadataKeys.partition_key, name, constructor);
  };

export const SortKey =
  (type: StringConstructor | NumberConstructor) => (constructor: any, name: string) => {
    Field({ type })(constructor, name);
    Reflect.defineMetadata(ModelMetadataKeys.sort_key, name, constructor);
  };
