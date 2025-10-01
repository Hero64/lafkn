import { LambdaFunction } from '@cdktf/provider-aws/lib/lambda-function';
import type { TerraformAsset } from 'cdktf';

import type { AppModule } from '../../types';
import { createResource } from '../resource/resource';
import { Role } from '../role';
import { assets } from './asset/asset';
import type { LambdaHandlerProps } from './lambda.types';

export class LambdaHandler {
  constructor(
    protected scope: AppModule,
    protected props: LambdaHandlerProps
  ) {}

  async generate() {
    const lambdaAsset = await assets.buildHandler(this.scope.app, this.props);
    return this.createLambdaFunction(lambdaAsset);
  }

  private createLambdaFunction(asset: TerraformAsset) {
    const name = this.getHandlerName();
    const role = this.getRole(name);

    return createResource(LambdaFunction, this.scope.app, name, {
      functionName: name,
      role: role.arn,
      filename: asset.path,
      handler: `index.${this.props.name}`,
      runtime: this.getRuntime(),
      timeout: this.props.lambda?.timeout,
      memorySize: this.props.lambda?.memory,
      description: this.props.description,
      tracingConfig: {
        mode: this.props.lambda?.enableTrace ? 'Active' : 'PassThrough',
      },
    });
  }

  private getRuntime() {
    return `nodejs${this.props.lambda?.runtime || this.scope.config || 22}.x`;
  }

  private getHandlerName() {
    return `${this.props.name}-${this.scope.name}${this.props.suffix ? `-${this.props.suffix}` : ''}`.toLowerCase();
  }

  private getRole(name: string) {
    if (!this.props.lambda?.services) {
      return this.scope.config?.role || this.scope.app.config.role;
    }

    const roleName = `${name}-role`;

    return new Role(this.scope.app, roleName, {
      name: roleName,
      services: this.props.lambda.services,
    });
  }
}
