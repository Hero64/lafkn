import 'reflect-metadata';
import { join } from 'node:path';
import {
  type ClassResource,
  enableBuildEnvVariable,
  LambdaReflectKeys,
  type ResourceMetadata,
  ResourceReflectKeys,
} from '@alicanto/common';

import { Fifo, Queue, RESOURCE_TYPE, Standard } from './queue';
import type { QueueLambdaMetadata } from './queue.types';

describe('Queue Decorator', () => {
  beforeAll(() => {
    enableBuildEnvVariable();
  });

  describe('Resource', () => {
    let resource: ResourceMetadata;
    let testQueue: ClassResource;
    beforeAll(() => {
      @Queue()
      class TestQueue {}

      testQueue = TestQueue;

      resource = Reflect.getMetadata(ResourceReflectKeys.RESOURCE, TestQueue);
    });

    it('Should exist queue resource', () => {
      expect(resource).toBeDefined();
    });

    it('Should be a queue resource', () => {
      expect(resource.type).toBe(RESOURCE_TYPE);
    });

    it('Should get resource params', () => {
      expect(resource.name).toBe(testQueue.name);
    });

    it('Should identify class folder ', () => {
      expect(join(resource.foldername, resource.filename)).toBe(__filename);
    });
  });

  describe('Fifo', () => {
    let handlers: QueueLambdaMetadata[];
    beforeAll(() => {
      @Queue()
      class TestQueue {
        @Fifo({
          deliveryDelay: 1000,
          contentBasedDeduplication: true,
        })
        testFifo() {}
      }

      handlers =
        Reflect.getMetadata(LambdaReflectKeys.handlers, TestQueue.prototype) || [];
    });

    it('Should create a fifo resources', () => {
      expect(handlers.length > 0).toBeTruthy();
    });

    it('Should contain test method', () => {
      expect(handlers[0].name).toBe('testFifo');
    });

    it('Should contain fifo options', () => {
      expect(handlers[0].isFifo).toBeTruthy();
    });
  });

  describe('Standard', () => {
    let handlers: QueueLambdaMetadata[];
    beforeAll(() => {
      @Queue()
      class TestQueue {
        @Standard({
          deliveryDelay: 1000,
        })
        testStandard() {}
      }

      handlers =
        Reflect.getMetadata(LambdaReflectKeys.handlers, TestQueue.prototype) || [];
    });

    it('Should create a standard resources', () => {
      expect(handlers.length > 0).toBeTruthy();
    });

    it('Should contain test method', () => {
      expect(handlers[0].name).toBe('testStandard');
    });

    it('Should contain standard options', () => {
      expect(handlers[0].isFifo).toBeFalsy();
    });
  });
});
