import {
  Api,
  type BucketIntegrationOption,
  type BucketIntegrationResponse,
  Get,
  IntegrationOptions,
} from '@alicanto/api/main';

@Api({
  path: 'bucket',
})
export class BucketIntegration {
  @Get({
    integration: 'bucket',
    action: 'Download',
  })
  get(
    @IntegrationOptions() { getResourceValue }: BucketIntegrationOption
  ): BucketIntegrationResponse {
    return {
      bucket: getResourceValue('alicanto-example-documents', 'id'),
      object: 'new.json',
    };
  }
}
