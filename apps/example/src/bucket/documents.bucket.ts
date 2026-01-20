import { Bucket } from '@lafkn/bucket/main';

@Bucket({
  name: 'lafkn-example-documents',
  forceDestroy: true,
  eventBridgeEnabled: true,
})
export class DocumentBucket {}
