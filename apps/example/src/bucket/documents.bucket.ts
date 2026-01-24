import { Bucket } from '@lafken/bucket/main';

@Bucket({
  name: 'lafken-example-documents',
  forceDestroy: true,
  eventBridgeEnabled: true,
})
export class DocumentBucket {}
