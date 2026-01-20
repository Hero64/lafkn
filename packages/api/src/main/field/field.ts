import 'reflect-metadata';
import { createFieldDecorator, createFieldName, FieldProperties } from '@lafkn/common';
import { RESOURCE_TYPE } from '../api';
import type { ApiFieldMetadata, ApiFieldProps, ApiParamMetadata } from './field.types';

export const apiFieldKey = createFieldName(RESOURCE_TYPE, FieldProperties.field);

export const Field = createFieldDecorator<ApiFieldProps, ApiFieldMetadata>({
  prefix: RESOURCE_TYPE,
  getMetadata: (props) => {
    return {
      validation: {
        ...(props?.validation || {}),
        required: props?.validation?.required ?? true,
      },
    };
  },
});

export const Param = createFieldDecorator<ApiFieldProps, ApiParamMetadata>({
  prefix: RESOURCE_TYPE,
  getMetadata: (props) => {
    return {
      source: props?.source || 'query',
      validation: {
        ...(props?.validation || {}),
        required: props?.validation?.required ?? true,
      },
    };
  },
});
