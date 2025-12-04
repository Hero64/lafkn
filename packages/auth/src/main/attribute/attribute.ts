import 'reflect-metadata';
import {
  createFieldDecorator,
  createFieldName,
  createPayloadDecorator,
  FieldProperties,
} from '@alicanto/common';
import { RESOURCE_TYPE } from '../extension/extension';
import type {
  AuthAttributes,
  CommonStandardAttribute,
  CustomAttributeProps,
  CustomAttributesMetadata,
  StandardAttributeMetadata,
} from './attribute.types';

export const authFieldKey = createFieldName(RESOURCE_TYPE, FieldProperties.field);
export const authPayloadKey = createFieldName(RESOURCE_TYPE, FieldProperties.payload);

export const Attributes = createPayloadDecorator({
  prefix: RESOURCE_TYPE,
  createUniqueId: false,
});

/**
 * `@Standard`
 *
 * Decorator that create a attribute in cognito user pool.
 */
export const Custom =
  <T extends Record<A, number | string | boolean | Date>, A extends keyof T>(
    props: CustomAttributeProps<T[A]> = {} as CustomAttributeProps<T[A]>
  ) =>
  (target: T, propertyName: A) =>
    createFieldDecorator<CustomAttributeProps<T[A]>, CustomAttributesMetadata>({
      prefix: RESOURCE_TYPE,
      getMetadata: (props) => ({
        ...props,
        attributeType: 'custom',
        mutable: props?.mutable ?? true,
      }),
    })(props)(target, propertyName as string);

/**
 * `@Standard`
 *
 * Decorator that marks a property as a standard attribute supported by Cognito.
 *
 * This decorator can only be applied to the following attributes:
 * - `"name"`
 * - `"familyName"`
 * - `"givenName"`
 * - `"middleName"`
 * - `"nickname"`
 * - `"preferredUsername"`
 * - `"profile"`
 * - `"picture"`
 * - `"website"`
 * - `"gender"`
 * - `"birthdate"`
 * - `"zoneInfo"`
 * - `"locale"`
 * - `"updated_at"`
 * - `"address"`
 * - `"email"`
 * - `"phoneNumber"`
 * - `"sub"`
 */
export const Standard =
  (props: CommonStandardAttribute = {}) =>
  (target: any, propertyKey: keyof AuthAttributes) =>
    createFieldDecorator<CommonStandardAttribute, StandardAttributeMetadata>({
      prefix: RESOURCE_TYPE,
      getMetadata: (props) => ({
        attributeType: 'standard',
        mutable: props?.mutable ?? true,
        required: props?.required ?? true,
      }),
    })(props)(target, propertyKey as string);
