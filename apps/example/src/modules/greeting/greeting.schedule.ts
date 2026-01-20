import { Cron, Schedule } from '@lafkn/schedule/main';

@Schedule()
export class GreetingSchedule {
  @Cron({
    schedule: {
      minute: '20,22',
    },
  })
  sayHello() {
    console.log('Hello schedule');
  }
}
