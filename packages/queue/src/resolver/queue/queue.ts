import { alicantoResource, LambdaHandler } from '@alicanto/resolver';
import { LambdaEventSourceMapping } from '@cdktf/provider-aws/lib/lambda-event-source-mapping';
import { SqsQueue } from '@cdktf/provider-aws/lib/sqs-queue';
import { Construct } from 'constructs';
import type { QueueProps } from './queue.types';

export class Queue extends Construct {
  constructor(
    scope: Construct,
    private id: string,
    private props: QueueProps
  ) {
    super(scope, id);
  }

  public async create() {
    const { handler, resourceMetadata } = this.props;

    /**
     * TODO: verificar si necesita un rol
     */
    const lambdaHandler = new LambdaHandler(this, 'handler', {
      ...handler,
      filename: resourceMetadata.filename,
      pathName: resourceMetadata.foldername,
      suffix: 'queue',
    });

    const lambda = await lambdaHandler.generate();

    const queue = alicantoResource.create(
      resourceMetadata.name,
      SqsQueue,
      this,
      `${this.id}-queue`,
      {
        name: handler.name,
        fifoQueue: handler.isFifo,
        contentBasedDeduplication: handler.contentBasedDeduplication,
        visibilityTimeoutSeconds: handler.visibilityTimeout,
        messageRetentionSeconds: handler.retentionPeriod,
        maxMessageSize: handler.maxMessageSizeBytes,
        delaySeconds: handler.deliveryDelay,
      }
    );
    queue.isGlobal();

    new LambdaEventSourceMapping(this, `${this.id}-event-mapping`, {
      batchSize: handler.batchSize,
      eventSourceArn: queue.arn,
      functionName: lambda.arn,
      maximumBatchingWindowInSeconds: handler.maxBatchingWindow,
      scalingConfig: handler.maxConcurrency
        ? {
            maximumConcurrency: handler.maxConcurrency,
          }
        : undefined,
    });
  }
}
