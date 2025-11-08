import { alicantoResource } from '../resources';

export class ResolveResources {
  private unresolved: string[] = [];

  public getResourceValue(module: string, id: string, type: string) {
    this.unresolved = [];

    const resource = alicantoResource.getResource(module, id);

    if (!resource) {
      this.unresolved.push(`${module}::${id}::${type}`);
      return '';
    }

    const propertyValue = resource[type];
    if (!propertyValue) {
      throw new Error(`property ${type} in ${module}::${id} not found`);
    }

    return propertyValue;
  }

  public hasUnresolved() {
    return this.unresolved.length > 0;
  }
}
