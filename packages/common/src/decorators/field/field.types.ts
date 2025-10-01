import type { PayloadMetadata } from '../payload';

export type FieldTypes =
  | 'String'
  | 'Number'
  | 'Boolean'
  | 'Array'
  | 'Object'
  | (string & {});

export type BasicTypes = StringConstructor | NumberConstructor | BooleanConstructor;

export type AllowedTypes =
  | String
  | Number
  | Boolean
  | Function
  | [String | Number | Boolean | Function];

export type AllowedTypesWithoutFunction = BasicTypes | [BasicTypes];

export type EnumValue = (string | number)[];

export interface FieldProps {
  /**
   * Original field name.
   *
   * Specifies the original name of the field as it is expected
   * in the input or payload. This is used to map incoming data
   * to the corresponding property in the system.
   */
  name?: string;
  /**
   * Field data type.
   *
   * Specifies the type of the field. By default, the type is inferred
   * from the property that decorates the field. However, it can be
   * explicitly set to a primitive type such as `String`, `Number`,
   * `Boolean`, or to another payload type.
   *
   * This ensures correct parsing, validation, and serialization of the field's value.
   */
  type?: AllowedTypes;
}

export interface FieldWithClassInformation<M = any> {
  fieldType: FieldTypes;
  params?: FieldInformation<M[]>;
  subFieldType?: FieldTypes;
}

export interface FieldMetadata<M = any> extends FieldWithClassInformation<M> {
  name: string;
  destinationField: string;
}

export interface FieldInformation<T = any, A = PayloadMetadata> {
  fields: T;
  additionalInformation?: A;
}
