# @lafken/state-machine

`@lafken/state-machine` helps you create and manage AWS Step Functions state machines using decorators. It simplifies the definition of complex workflows by allowing you to define states, transitions, and integrations directly within your TypeScript classes.

> [!NOTE]
> This library exclusively supports **JSONata** for data transformation and querying. **JSONPath is not supported**.

## Installation

```bash
npm install @lafken/state-machine
```

## Configuration

Add the `StateMachineResolver` from the `@lafken/state-machine/resolver` library to your application configuration.

```typescript
import { StateMachineResolver } from '@lafken/state-machine/resolver';

createApp({
  name: 'awesome-app',
  resolvers: [
    new StateMachineResolver(),
  ],
  // ...
});

// ...

@StateMachine({
  startAt: 'sayHello'
})
class GreetingStateMachine {
  @State({
    end: true
  })
  sayHello() {
    return 'Hello'
  }
}

const greetingModule = createModule({
  name: 'greeting',
  resources: [
    GreetingStateMachine
  ]
});
```

## Features

### Defining a State Machine

Use the `@StateMachine` decorator to define a class as a state machine resource. You must specify the `startAt` property to define the entry point of the state machine.

```typescript
import { StateMachine, State } from '@lafken/state-machine';

@StateMachine({
  startAt: 'initialState',
})
export class MyWorkflow {
  // ... states
}
```

### Lambda Tasks

Use the `@State` decorator to define a Lambda function task. This decorator automatically creates a Lambda function and integrates it as a task in the state machine.

```typescript
@State({
  next: 'nextState',
})
initialState(@Event() event: any) {
  return { status: 'processed' };
}
```

### Nested State machines

Both Parallel and Map states must include a class decorated with @NestedStateMachine. This class defines and manages the internal states executed by each task within the parent state, allowing you to model complex workflows with nested execution logic.

```typescript
@NestedStateMachine({
  startAt: 'log',
})
class MapState {
  @State({
    end: true,
  })
  log(@Event('{% { "index": $states.input } %}') index: { index: number }) {
    console.log('Hello', index);

    return index.index * 2;
  }
}

@StateMachine({
  startAt: {
    type: 'map',
    mode: 'inline',
    states: MapState
  }
})
class AwesomeStateMachine {}

```

### State Events

Each method decorated with the @State decorator can receive an event as input. This event can be defined either as a JSONata expression or as a class decorated with @Payload, which describes the structure and fields required by the state.

This approach provides a clear and declarative way to define state inputs and ensures consistent data handling across state machine executions.

```typescript

@Payload()
export class StateMachinePayload {
  @SMParam({
    context: 'input',
    source: 'name',
  })
  name: string;

  @Param({
    context: 'input',
    source: 'list',
    type: [Number],
  })
  list: number[];
}

@StateMachine({
  startAt: 'eventHandler'
})
class AwesomeStateMachine {
  @State({
    next: 'endState'
  })
  eventHandler(@Event(StateMachinePayload) e: StateMachinePayload) {
    // ...
  }

  @State({
    end: true
  })
  endState(@Event('{% $states.input %}') e: any) {
    // ...
  }
}
```
