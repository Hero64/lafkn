/**
 * Type declarations for Alicanto framework resources
 * This file extends the interfaces from @alicanto/common to define
 * the available resources for this specific application
 */

declare module '@alicanto/common' {
  interface ModulesAvailable {
    greeting: {
      StateMachine: {
        GreetingStepFunction: true;
      };
    };
  }

  interface BucketAvailable {
    'alicanto-example-documents': true;
  }

  interface ApiRestAvailable {
    ExampleApi: boolean;
  }
}

export {};
