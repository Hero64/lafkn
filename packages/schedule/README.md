# @lafken/schedule

`@lafken/schedule` simplifies the creation and management of Amazon EventBridge scheduled rules (Cron jobs) and their integration with AWS Lambda. It provides decorators to define scheduled tasks using standard cron expressions or structured time objects.

## Installation

```bash
npm install @lafken/schedule
```

## Configuration

Add the `ScheduleResolver` from the `@lafken/schedule/resolver` library to your application configuration.

```typescript
import { ScheduleResolver } from '@lafken/schedule/resolver';

createApp({
  name: 'awesome-app',
  resolvers: [
    new ScheduleResolver(),
  ],
  ...
});

// ...

@Schedule()
class GreetingSchedule {
  // ...
}

const greetingModule = createModule({
  name: 'greeting',
  resources: [
    GreetingSchedule
  ]
});

```

## Features

### Defining a Schedule Resource

Use the `@Schedule` decorator to define a class that contains scheduled tasks.

```typescript
import { Schedule, Cron } from '@lafken/schedule';

@Schedule()
export class DataSyncService {
  // ... cron handlers
}
```

### Defining Cron Tasks

Use the `@Cron` decorator to define a method as a scheduled task. You can configure the schedule using a standard cron string or a structured object.

#### Using Cron Strings

You can use standard AWS cron expressions: `cron(Minutes Hours Day-of-month Month Day-of-week Year)`.

```typescript
@Cron({
  schedule: 'cron(0 12 * * ? *)', // Run every day at 12:00 UTC
})
dailySync() {
  console.log('Running daily sync...');
}
```

#### Using Structured Schedule Objects

You can also define the schedule using a readable object format.

```typescript
@Cron({
  schedule: {
    minute: '0',
    hour: '8',
    weekDay: 'MON-FRI',
  },
})
weekdayStart() {
  console.log('Starting weekday operations...');
}
```
