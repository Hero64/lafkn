import type { GetResourceProps } from '@lafken/common';
import { IntegrationOptions, State, StateMachine } from '@lafken/state-machine/main';

@StateMachine({
  services: [
    {
      type: 'state_machine',
      permissions: ['DescribeExecution', 'StartExecution', 'StopExecution'],
    },
  ],
  startAt: {
    type: 'wait',
    seconds: 2,
    next: 'callGreetingSM',
  },
})
export class SimpleStateMachine {
  @State({
    integrationService: 'states',
    action: 'startExecution',
    end: true,
  })
  callGreetingSM(@IntegrationOptions() { getResourceValue }: GetResourceProps) {
    return {
      StateMachineArn: getResourceValue('greeting::GreetingStepFunction', 'arn'),
      Input: {
        type: 'map',
        name: 'example',
        list: [1, 2, 3, 4],
      },
    };
  }
}
