import 'reflect-metadata';
import { isBuildEnvironment } from '../../utils/build-env.utils';
import type {
  AllowedTypes,
  FieldInformation,
  FieldMetadata,
  FieldProps,
  FieldTypes,
  FieldWithClassInformation,
} from './field.types';

export const FieldKey = 'field:metadata';

export const getPrimitiveType = (type: AllowedTypes): FieldTypes | undefined => {
  if (type === String) return 'String';
  if (type === Number) return 'Number';
  if (type === Boolean) return 'Boolean';
};

export const getClassData = (
  ParamClass: Function,
  fieldKey: string,
  payloadKey: string
) => ({
  fields: Reflect.getMetadata(fieldKey, ParamClass.prototype) as any[],
  additionalInformation: Reflect.getMetadata(payloadKey, ParamClass),
});

export const getMetadataOfType = (
  fieldKey: string,
  payloadKey: string,
  type?: AllowedTypes,
  defaultFieldType: FieldTypes = 'Object'
): FieldWithClassInformation => {
  let params: FieldInformation | undefined;
  let fieldType: FieldTypes = defaultFieldType;
  let subFieldType: FieldTypes | undefined;

  if (type !== undefined) {
    const primitiveType = getPrimitiveType(type);

    if (primitiveType) {
      fieldType = primitiveType;
    } else if (typeof type === 'function') {
      params = getClassData(type, fieldKey, payloadKey);
      fieldType = 'Object';
    } else if (Array.isArray(type)) {
      fieldType = 'Array';
      const arrayType = type[0];
      const arrayPrimitiveType = getPrimitiveType(arrayType);

      if (arrayPrimitiveType) {
        subFieldType = arrayPrimitiveType;
      } else if (typeof arrayType === 'function') {
        subFieldType = 'Object';
        params = getClassData(arrayType, fieldKey, payloadKey);
      }
    }
  }

  return {
    params,
    fieldType,
    subFieldType,
  };
};

export const generateFieldMetadata = <T extends FieldProps>(
  props: T,
  fieldKey: string,
  payloadKey: string,
  propertyKey: string,
  paramFieldType: FieldTypes
): FieldMetadata => {
  const { name, type } = props;
  const { params, fieldType, subFieldType } = getMetadataOfType(
    fieldKey,
    payloadKey,
    type,
    paramFieldType
  );

  return {
    params,
    fieldType,
    subFieldType,
    name: name ?? propertyKey,
    destinationField: propertyKey,
  };
};

export const createFieldDecorator =
  <T extends FieldProps, M extends FieldMetadata>(
    getMetadata: (props: T, field: M) => M,
    fieldKey: string,
    payloadKey: string,
    enableInLambdaInvocation = false
  ) =>
  (props?: T) =>
  (target: any, propertyKey: string) => {
    if (isBuildEnvironment() || enableInLambdaInvocation) {
      const prevMetadata: M[] = Reflect.getMetadata(fieldKey, target) || [];
      const designType = Reflect.getMetadata('design:type', target, propertyKey).name;
      const field = generateFieldMetadata(
        props || ({} as T),
        fieldKey,
        payloadKey,
        propertyKey,
        designType
      );

      const newMetadata = [...prevMetadata, getMetadata(props || ({} as T), field as M)];
      Reflect.defineMetadata(fieldKey, newMetadata, target);
    }
  };
