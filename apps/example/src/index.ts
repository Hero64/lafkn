// import { AuthResolver } from '@lafken/auth/resolver';

// import { ApiResolver } from '@lafken/api/resolver';
// import { DynamoResolver } from '@lafken/dynamo/resolver';
import { BucketResolver } from '@lafken/bucket/resolver';
// import { EventRuleResolver } from '@lafken/event/resolver';
import { createApp } from '@lafken/main';
import { StateMachineResolver } from '@lafken/state-machine/resolver';
// import { ScheduleResolver } from '@lafken/schedule/resolver';
// import { Client } from './model/client.model';
import { DocumentBucket } from './bucket/documents.bucket';
// import { ApiKeyAuth } from './auth/apikey.auth';
// import { UserPoolAttributes } from './auth/attributes.auth';
// import { CognitoAuth } from './auth/cognito.auth';
// import { QueueResolver } from '@lafken/queue/resolver';
// import { ExampleCustomAuthorizer } from './auth/custom.auth';
import GreetingStack from './modules/greeting/greeting.module';

createApp({
  globalConfig: {
    lambda: {
      env: {
        aaa: 'bbb',
      },
    },
  },
  name: 'example',
  modules: [GreetingStack],
  resolvers: [
    // new ApiResolver({
    //   restApi: {
    //     name: 'ExampleApi',
    //     supportedMediaTypes: ['application/pdf', 'image/jpeg'],
    //     auth: {
    //       authorizers: [ExampleCustomAuthorizer, ApiKeyAuth, CognitoAuth],
    //       defaultAuthorizerName: 'ExampleCustomAuthorizer',
    //     },
    //   },
    // }),
    // new EventRuleResolver(),
    // new ScheduleResolver(),
    // new AuthResolver({
    //   name: 'example-user-pool',
    //   userPool: {
    //     cognitoPlan: 'essentials',
    //     attributes: UserPoolAttributes,
    //     autoVerifyAttributes: ['email'],
    //     usernameAttributes: ['email'],
    //     selfSignUpEnabled: true,
    //   },
    //   userClient: {
    //     enableTokenRevocation: true,
    //     authFlows: ['allow_user_password_auth'],
    //   },
    // }),
    // new QueueResolver(),
    new BucketResolver([DocumentBucket]),
    // new DynamoResolver([Client]),
    new StateMachineResolver(),
    // new EventResolver(),
  ],
});
