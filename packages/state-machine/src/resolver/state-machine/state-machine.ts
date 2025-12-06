import { SfnStateMachine } from '@cdktf/provider-aws/lib/sfn-state-machine';
import { type AppModule, lafkenResource } from '@lafken/resolver';
import { Schema } from './schema/schema';
import type { StateMachineProps } from './state-machine.types';

export class StateMachine extends lafkenResource.make(SfnStateMachine) {
  constructor(scope: AppModule, id: string, props: StateMachineProps) {
    const { resourceMetadata, role, classResource } = props;

    const schema = new Schema(scope, classResource);
    const definition = schema.getDefinition();

    super(scope, `${id}-state-machine`, {
      name: resourceMetadata.name,
      roleArn: role.arn,
      definition: JSON.stringify({
        ...definition,
        QueryLanguage: 'JSONata',
        ExecutionType: resourceMetadata.executionType?.toUpperCase(),
      }),
    });

    this.isGlobal(scope.id, id);
  }
}
