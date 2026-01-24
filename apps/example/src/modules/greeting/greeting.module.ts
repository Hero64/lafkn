import { createModule } from '@lafken/main';

// import { GreetingEvent } from './greeting.event';

// import { GreetingSchedule } from './greeting.schedule';

// import { GreetingApi } from './greeting.api';

// import { QueueIntegration } from './greeting.api.queue';
// import { GreetingQueues } from './greeting.queue';
import { GreetingStepFunction } from './state-machine/greeting.state-machine';
import { SimpleStateMachine } from './state-machine/simple.state-machine';

const greetingModule = createModule({
  name: 'greeting',
  resources: [
    GreetingStepFunction,
    SimpleStateMachine,
    // GreetingApi,
    // GreetingSchedule,
    // GreetingEvent,
    // QueueIntegration,
    // GreetingQueues,
    /*BucketIntegration, GreetingApi, DynamoIntegration*/
  ],
});

export default greetingModule;
