import type { ClassResource } from '@alicanto/common';
import { type FieldsMetadata, ModelMetadataKeys } from '../../main/model';
import type { ModelMetadata } from '../query-builder/query-builder.types';

export const getModelInformation = <E extends ClassResource>(model: E) => {
  const modelProps: ModelMetadata<E> = Reflect.getMetadata(
    ModelMetadataKeys.model,
    model
  );
  const partitionKey: string = Reflect.getMetadata(
    ModelMetadataKeys.partition_key,
    model.prototype
  );

  const sortKey: string | undefined = Reflect.getMetadata(
    ModelMetadataKeys.sort_key,
    model.prototype
  );

  const fields: FieldsMetadata = Reflect.getMetadata(
    ModelMetadataKeys.fields,
    model.prototype
  );

  return {
    modelProps,
    partitionKey,
    sortKey,
    fields,
  };
};
