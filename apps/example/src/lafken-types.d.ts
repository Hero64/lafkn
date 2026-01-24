/**
 * Type declarations for Lafken framework resources
 * This file extends the interfaces from @lafken/common to define
 * the available resources for this specific application
 */

declare module '@lafken/common' {
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
    'lafken-example-documents': true;
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
