import 'cdktf/lib/testing/adapters/jest';
import { LambdaHandler } from '@alicanto/resolver';
import { LambdaEventSourceMapping } from '@cdktf/provider-aws/lib/lambda-event-source-mapping';
import { SqsQueue } from '@cdktf/provider-aws/lib/sqs-queue';
import { TerraformStack, Testing } from 'cdktf';
import { Queue as QueueResolver } from './queue';

Testing.setupJest();

jest.mock('@alicanto/resolver', () => {
  const actual = jest.requireActual('@alicanto/resolver');

  return {
    ...actual,
    LambdaHandler: jest.fn().mockImplementation(() => ({
      generate: jest.fn().mockReturnValue({
        arn: 'test-function',
      }),
    })),
  };
});

const setupQueueApp = () => {
  const app = Testing.app();
  const stack = new TerraformStack(app, 'testing-stack');

  return {
    app,
    stack,
  };
};

describe('Queue', () => {
  it('should create a fifo queue integration without file creation', async () => {
    const { stack } = setupQueueApp();
    const queue = new QueueResolver(stack, 'fifo', {
      handler: {
        name: 'fifo',
        isFifo: true,
      },
      resourceMetadata: {
        filename: 'test.js',
        foldername: __dirname,
        name: 'queue',
        originalName: 'queue',
        type: 'QUEUE',
      },
    });

    await queue.create();

    const synthesized = Testing.synth(stack);

    expect(LambdaHandler).toHaveBeenCalledWith(
      expect.anything(),
      'handler',
      expect.objectContaining({
        filename: 'test.js',
        isFifo: true,
        name: 'fifo',
        pathName: __dirname,
        suffix: 'queue',
      })
    );

    expect(synthesized).toHaveResourceWithProperties(SqsQueue, {
      fifo_queue: true,
      name: 'fifo',
    });

    expect(synthesized).toHaveResourceWithProperties(LambdaEventSourceMapping, {
      event_source_arn: '${aws_sqs_queue.fifo_fifo-queue_7BB3186C.arn}',
      function_name: 'test-function',
    });
  });

  it('should create a standard queue integration without file creation', async () => {
    const { stack } = setupQueueApp();
    const queue = new QueueResolver(stack, 'standard', {
      handler: {
        name: 'standard',
        isFifo: false,
      },
      resourceMetadata: {
        filename: 'test.js',
        foldername: __dirname,
        name: 'queue',
        originalName: 'queue',
        type: 'QUEUE',
      },
    });

    await queue.create();

    const synthesized = Testing.synth(stack);

    expect(LambdaHandler).toHaveBeenCalledWith(
      expect.anything(),
      'handler',
      expect.objectContaining({
        filename: 'test.js',
        isFifo: true,
        name: 'fifo',
        pathName: __dirname,
        suffix: 'queue',
      })
    );

    expect(synthesized).toHaveResourceWithProperties(SqsQueue, {
      fifo_queue: false,
      name: 'standard',
    });

    expect(synthesized).toHaveResourceWithProperties(LambdaEventSourceMapping, {
      event_source_arn: '${aws_sqs_queue.standard_standard-queue_C8EAAF87.arn}',
      function_name: 'test-function',
    });
  });
});
