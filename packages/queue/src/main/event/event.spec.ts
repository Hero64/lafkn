import 'reflect-metadata';
import {
  type ClassResource,
  enableBuildEnvVariable,
  FieldProperties,
  type PayloadMetadata,
} from '@alicanto/common';
import { Fifo, Queue } from '../queue';
import { Event, Field, Param, Payload } from './event';
import type { QueueParamMetadata } from './event.types';

describe('Event Decorator', () => {
  beforeAll(() => {
    enableBuildEnvVariable();
  });

  describe('Payload decorator', () => {
    let payloadMetadata: PayloadMetadata;
    beforeAll(() => {
      @Payload()
      class TestEvent {}

      payloadMetadata = Reflect.getMetadata(FieldProperties.payload, TestEvent) || {};
    });

    it('Should exist payload', () => {
      expect(payloadMetadata).toBeDefined();
    });

    it('Should be a queue resource', () => {
      expect(payloadMetadata.name).toBe('TestEvent');
    });
  });

  describe('Param decorator', () => {
    let paramMetadata: QueueParamMetadata[];
    let testQueue: ClassResource;
    beforeAll(() => {
      @Payload()
      class SubField {
        @Field()
        age: number;

        @Field()
        other: string;
      }

      @Payload()
      class TestEvent {
        @Param()
        name: string;

        @Param({
          source: 'body',
          parse: true,
          type: [SubField],
        })
        body: SubField;
      }

      @Queue()
      class TestQueue {
        @Fifo({
          deliveryDelay: 1000,
          contentBasedDeduplication: true,
        })
        testFifo(@Event(TestEvent) events: TestEvent[]) {
          return events;
        }
      }

      testQueue = TestQueue;

      paramMetadata =
        Reflect.getMetadata(FieldProperties.field, TestEvent.prototype) || [];
    });

    it('Should exist params', () => {
      expect(paramMetadata).toBeDefined();
    });

    it('Should be two params', () => {
      expect(paramMetadata.length > 0).toBeTruthy();
    });

    it('Should transform default queue event', async () => {
      const queue = new testQueue();
      const event = {
        Records: [
          {
            body: JSON.stringify({ body: { age: 1, other: '1' } }),
            messageId: '1',
            messageAttributes: {
              name: {
                stringValue: 'aaa',
                dataType: 'String',
              },
            },
          },
        ],
      } as unknown as any;

      const response = await (queue as any).testFifo(event);

      expect(response).toBeInstanceOf(Array);

      expect(response[0].name).toBeDefined();
      expect(response[0].body).toBeDefined();
    });
  });
});
