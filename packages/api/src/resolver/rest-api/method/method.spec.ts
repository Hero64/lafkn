import {
  type ClassResource,
  getResourceHandlerMetadata,
  getResourceMetadata,
} from '@alicanto/common';
import type { TerraformStack } from 'cdktf';
import type { ApiLambdaMetadata, ApiResourceMetadata } from '../../../main';
import type { RestApi } from '../rest-api';

export const initializeMethod = async (
  restApi: RestApi,
  stack: TerraformStack,
  classResource: ClassResource,
  handlerName: string
) => {
  const handlers = getResourceHandlerMetadata<ApiLambdaMetadata>(classResource);
  const resourceMetadata = getResourceMetadata<ApiResourceMetadata>(classResource);

  const handler = handlers.find((h) => h.name === handlerName) as ApiLambdaMetadata;

  await restApi.addMethod(stack, {
    classResource,
    handler,
    resourceMetadata,
  });
};
