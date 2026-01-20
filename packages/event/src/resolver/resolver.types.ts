import type { CloudwatchEventBus } from '@cdktf/provider-aws/lib/cloudwatch-event-bus';
import type { EventBusNames } from '@lafkn/common';
import type { AppStack } from '@lafkn/resolver';

interface ExtendProps {
  scope: AppStack;
  eventBus: CloudwatchEventBus;
}

export interface EventRuleResolverProps {
  busName: EventBusNames;
  extend?: (props: ExtendProps) => void;
}
