import { ResolveResources } from '@alicanto/resolver';

export class IntegrationOptionResolver extends ResolveResources {
  public getCurrentDate() {
    return '$context.requestTimeEpoch';
  }
}
