import { createEventDecorator } from '@alicanto/common';
import { RESOURCE_TYPE } from '../extension/extension';

export const Event = () => createEventDecorator({ prefix: RESOURCE_TYPE })(class {});
