import { alicantoResource } from '@alicanto/resolver';
import { ApiGatewayDeployment } from '@cdktf/provider-aws/lib/api-gateway-deployment';
import {
  ApiGatewayRestApi,
  type ApiGatewayRestApiConfig,
} from '@cdktf/provider-aws/lib/api-gateway-rest-api';
import { ApiGatewayStage } from '@cdktf/provider-aws/lib/api-gateway-stage';
import type { TerraformResource } from 'cdktf';
import { Construct } from 'constructs';
import type { RestApiProps } from '../resolver.types';
import { AuthorizerFactory } from './factories/authorizer/authorizer';
import { ModelFactory } from './factories/model/model';
import { ResourceFactory } from './factories/resource/resource';
import { ResponseFactory } from './factories/response/response';
import { ValidatorFactory } from './factories/validator/validator';
import { ApiMethod } from './method/method';
import type { ApiMethodProps } from './method/method.types';

export class RestApi extends Construct {
  public api: ApiGatewayRestApi;
  public stageName: string;

  public resourceFactory: ResourceFactory;
  public validatorFactory: ValidatorFactory;
  public authorizerFactory: AuthorizerFactory;
  public modelFactory: ModelFactory;
  public responseFactory: ResponseFactory;

  private dependencies: TerraformResource[] = [];

  constructor(
    private scope: Construct,
    id: string,
    private props: RestApiProps
  ) {
    super(scope, id);
    this.createRestApi();
    this.stageName = this.getStageName();
    this.resourceFactory = new ResourceFactory(this);
    this.validatorFactory = new ValidatorFactory(this);
    this.authorizerFactory = new AuthorizerFactory(this, props.auth?.authorizers || []);
    this.modelFactory = new ModelFactory(this);
    this.responseFactory = new ResponseFactory(this);
  }

  public async addMethod(module: Construct, props: Omit<ApiMethodProps, 'restApi'>) {
    const method = new ApiMethod(
      module,
      `${props.resourceMetadata.name}-${props.handler.name}`,
      {
        ...props,
        cors: this.props.cors,
        restApi: this,
      }
    );

    await method.create();
  }

  public createStageDeployment() {
    const deployment = new ApiGatewayDeployment(this, `${this.props.name}-deployment`, {
      restApiId: this.api.id,
      dependsOn: this.dependencies,
      triggers: {
        redeployment: Date.now().toString(),
      },
      lifecycle: {
        createBeforeDestroy: true,
      },
    });

    new ApiGatewayStage(this, `${this.props.name}-stage`, {
      ...(this.props.stage || {}),
      deploymentId: deployment.id,
      restApiId: this.api.id,
      stageName: this.getStageName(),
      dependsOn: [deployment],
    });
  }

  public addDependency(dependency: TerraformResource) {
    this.dependencies.push(dependency);
  }

  private createRestApi() {
    const api = alicantoResource.create(
      'api',
      ApiGatewayRestApi,
      this.scope,
      this.props.name,
      this.parseRestApiOptions()
    );

    api.isGlobal();

    this.api = api;
  }

  private parseRestApiOptions(): ApiGatewayRestApiConfig {
    return {
      name: this.props.name,
      binaryMediaTypes: this.props.supportedMediaTypes,
      apiKeySource: this.props.apiKeySource
        ? this.props.apiKeySource.toUpperCase()
        : undefined,
      disableExecuteApiEndpoint: this.props.disableExecuteApiEndpoint,
      minimumCompressionSize: this.props.minCompressionSize
        ? this.props.minCompressionSize.toString()
        : undefined,
    };
  }

  private getStageName() {
    return this.props.stage?.stageName || 'api';
  }
}
