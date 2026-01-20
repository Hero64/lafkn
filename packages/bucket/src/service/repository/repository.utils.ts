import type { ClassResource } from '@lafkn/common';
import { BucketMetadataKeys, type BucketMetadataProps } from '../../main/bucket';

export const getBucketInformation = <E extends ClassResource>(bucket: E) => {
  const bucketProps: BucketMetadataProps = Reflect.getMetadata(
    BucketMetadataKeys.bucket,
    bucket
  );

  return bucketProps;
};
