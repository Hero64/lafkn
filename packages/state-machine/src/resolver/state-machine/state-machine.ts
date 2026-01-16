import { SfnStateMachine } from '@cdktf/provider-aws/lib/sfn-state-machine';
import { type AppModule, lafkenResource } from '@lafken/resolver';
import { Schema } from './schema/schema';
import type { DefinitionSchema } from './schema/schema.types';
import type { StateMachineProps } from './state-machine.types';

export class StateMachine extends lafkenResource.make(SfnStateMachine) {
  constructor(
    scope: AppModule,
    id: string,
    private props: StateMachineProps
  ) {
    const { resourceMetadata, role } = props;

    // generar el rol

    super(scope, `${id}-state-machine`, {
      name: resourceMetadata.name,
      roleArn: role.arn,
      definition: '',
    });

    this.isGlobal(scope.id, id);
  }

  async attachDefinition() {
    const { classResource } = this.props;

    const schema = new Schema(this, classResource);
    const definition = await schema.getDefinition();

    if (!schema.hasUnresolvedDependency) {
      this.overrideDefinition(definition);
    }

    if (schema.hasUnresolvedDependency) {
      this.isDependent(async () => {
        this.overrideDefinition(await schema.resolveArguments(definition));
      });
    }
  }

  private overrideDefinition(definition: DefinitionSchema) {
    const { resourceMetadata } = this.props;

    this.addOverride(
      'definition',
      JSON.stringify({
        ...definition,
        QueryLanguage: 'JSONata',
        ExecutionType: resourceMetadata.executionType
          ? resourceMetadata.executionType.toUpperCase()
          : undefined,
      })
    );
  }
}
