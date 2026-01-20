# @lafkn/queue

`@lafkn/queue` simplifies the creation and management of Amazon SQS queues and their integration with AWS Lambda. It provides decorators to define Standard and FIFO queues, configure their properties, and map message attributes and body content directly to your handler parameters.

## Installation

```bash
npm install @lafkn/queue
```

## Configuration

Add the `QueueResolver` from the `@lafkn/queue/resolver` library to your application configuration.

```typescript
import { QueueResolver } from '@lafkn/queue/resolver';

createApp({
  name: 'awesome-app',
  resolvers: [
    new QueueResolver(),
  ],
  // ...
});

@Queue()
class GreetingQueue {
  // ...
}

const greetingModule = createModule({
  name: 'greeting',
  resources: [
    GreetingQueue
  ]
});
```

## Features

### Defining a Queue Resource

Use the `@Queue` decorator to define a class that contains queue-processing methods.

```typescript
import { Queue, Standard, Fifo } from '@lafkn/queue';

@Queue()
export class NotificationService {
  // ... queue handlers
}
```

### Standard Queues

Use the `@Standard` decorator to define a handler for a specific Standard SQS queue. You can configure properties such as visibility timeout, delivery delay, and batch size.

```typescript
@Standard({
  queueName: 'emails',
  visibilityTimeout: 30,
  batchSize: 10,
})
sendEmail(@Event() event: SQSEvent) {
  // Process messages
}
```

### FIFO Queues

Use the `@Fifo` decorator for FIFO (First-In-First-Out) queues. This ensures that the message order is preserved. You can enable content-based deduplication.

```typescript
@Fifo({
  queueName: 'orders.fifo',
  contentBasedDeduplication: true,
})
processOrder(@Event() event: SQSEvent) {
  // Process ordered messages
}
```

### Message Handling & Parameter Mapping

`@lafkn/queue` allows you to extract specific data from the SQS message directly into your method parameters using `@Param` and `@Payload`.

#### Accessing Message Body Fields

You can parse the message body (if it's JSON) and inject specific fields.

```typescript
@Standard({ queueName: 'registrations' })
registerUser(
  @Param({ source: 'body', parse: true, name: 'userId' }) userId: string,
  @Param({ source: 'body', parse: true, name: 'email' }) email: string
) {
  console.log(`Registering user ${userId} with email ${email}`);
}
```

#### Accessing Message Attributes

You can also access SQS Message Attributes.

```typescript
@Standard({ queueName: 'logging' })
logMessage(
  @Param({ source: 'attribute', name: 'TraceId' }) traceId: string,
  @Event() event: any
) {
  // ...
}
```

#### Using Payload DTOs

You can use the `@Payload` decorator to map the entire message body to a typed object.

```typescript
class UserDto {
  userId: string;
  email: string;
}

@Standard({ queueName: 'users' })
updateUser(@Payload() user: UserDto) {
  // user is fully typed and parsed from the message body
}
```
