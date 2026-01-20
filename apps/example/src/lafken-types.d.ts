/**
 * Type declarations for Lafkn framework resources
 * This file extends the interfaces from @lafkn/common to define
 * the available resources for this specific application
 */

declare module '@lafkn/common' {
  interface ModulesAvailable {
    greeting: {
      StateMachine: {
        GreetingStepFunction: true;
      };
      Queue: {
        'greeting-standard-queue': true;
      };
    };
  }

  interface BucketAvailable {
    'lafkn-example-documents': true;
  }

  interface ApiRestAvailable {
    ExampleApi: boolean;
  }

  interface ApiAuthorizerAvailable {
    'api-key-auth': true;
    'cognito-auth': true;
  }

  interface DynamoTableAvailable {
    clients: true;
  }

  interface AuthAvailable {
    'example-user-pool': true;
  }
}

export {};
