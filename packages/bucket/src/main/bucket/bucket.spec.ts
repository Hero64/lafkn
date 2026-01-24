import { enableBuildEnvVariable } from '@lafken/common';
import { Bucket } from './bucket';
import { BucketMetadataKeys } from './bucket.types';

describe('Bucket decorator', () => {
  enableBuildEnvVariable();
  it('should create a bucket resource metadata', () => {
    @Bucket({
      name: 'test',
      tracing: true,
    })
    class Test {}

    const metadata = Reflect.getMetadata(BucketMetadataKeys.bucket, Test);

    expect(metadata).toStrictEqual({
      name: 'test',
      tracing: true,
    });
  });
});
