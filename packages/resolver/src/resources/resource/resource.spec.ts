import { S3Bucket } from '@cdktf/provider-aws/lib/s3-bucket';
import { setupTestingStack } from '../../utils';
import { lafknResource } from './resource';

describe('Lafkn resource', () => {
  const Bucket = lafknResource.make(S3Bucket);
  it('should create lafkn resource', () => {
    const { stack } = setupTestingStack();

    const bucket = new Bucket(stack, 'test');

    expect(bucket.isGlobal).toBeDefined();
    expect(bucket.isDependent).toBeDefined();
  });

  it('should create a global resource', () => {
    const { stack } = setupTestingStack();

    const bucket = new Bucket(stack, 'testing');

    bucket.isGlobal('bucket', 'testing');

    const resourceBucket = lafknResource.getResource('bucket', 'testing');

    expect(bucket).toBe(resourceBucket);
  });

  it('should create a resource with dependencies', async () => {
    const { stack } = setupTestingStack();

    const bucket = new Bucket(stack, 'testing');

    const dependentFn = jest.fn();

    bucket.isDependent(dependentFn);
    await lafknResource.callDependentCallbacks();

    expect(dependentFn).toHaveBeenCalledTimes(1);
  });
});
