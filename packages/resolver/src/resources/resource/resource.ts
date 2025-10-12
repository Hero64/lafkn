import type { Construct } from 'constructs';
import type { DependentResource } from './resource.types';

class AlicantoResource {
  private globals: Record<string, Construct> = {};
  private dependent: DependentResource[] = [];

  create = <T extends new (...args: any[]) => Construct>(
    module: string,
    ExtendResource: T,
    ...props: ConstructorParameters<T>
  ): InstanceType<T> & {
    isGlobal(): void;
    isDependent(resolveDependency: () => void): void;
  } => {
    const self = this;

    class Resource extends ExtendResource {
      isGlobal() {
        const id = props[1] as string;
        self.globals[`${module}-${id}`] = this;
      }

      isDependent(resolveDependency: () => void) {
        self.dependent.push({
          resolveDependency,
          resource: this,
        });
      }
    }

    return new Resource(...props) as InstanceType<T> & {
      isGlobal(): void;
      isDependent(resolveDependency: () => void): void;
    };
  };

  getResource<T = any>(id: string): T {
    return this.globals[id] as T;
  }

  async callDependentCallbacks() {
    for (const resource of this.dependent) {
      await resource.resolveDependency();
    }
  }
}

export const alicantoResource = new AlicantoResource();
