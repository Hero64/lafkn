import { BucketMetadataKeys, type BucketProps } from './bucket.types';

export const Bucket =
  (props: BucketProps = {}) =>
  (target: Function) => {
    const { name = target.name } = props;

    Reflect.defineMetadata(
      BucketMetadataKeys.bucket,
      {
        name,
        ...props,
      },
      target
    );
  };
