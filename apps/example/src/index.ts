import { ApiResolver } from '@alicanto/api/resolver';
import { BucketResolver } from '@alicanto/bucket/resolver';
import { createApp } from '@alicanto/main';
import { DocumentBucket } from './bucket/documents.bucket';
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
    new ApiResolver({
      restApi: {
        name: 'ExampleApi',
      },
      // auth: {
      //   authorizers: [ExampleCustomAuthorizer],
      //   defaultAuthorizerName: 'ExampleCustomAuthorizer',
      // },
    }),
    new BucketResolver([DocumentBucket]),
    // new StateMachineResolver(),
    // new EventResolver(),
  ],
});
