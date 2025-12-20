# @lafken/common

`@lafken/common` is the core utility package for the Lafken framework. It provides the essential factory functions and utilities used to create the decorators that define infrastructure resources and Lambda handlers throughout the ecosystem.

## Features

### Decorator Factories

The package exports powerful factories to create custom decorators that integrate with the framework's metadata system.

#### `createResourceDecorator`

Use this factory to create class-level decorators that mark a class as a deployable resource (e.g., a State Machine, a Queue, or a custom Event).

It automatically captures:
- The resource name.
- The file path and folder name (for bundling).
- Custom metadata defined in your props.

```typescript
import { createResourceDecorator } from '@lafken/common';

export const MyCustomResource = createResourceDecorator({
  type: 'MY_CUSTOM_RESOURCE',
  callerFileIndex: 5, // Adjusts stack trace to find the caller file
});

// Usage
@MyCustomResource({ ... })
export class MyService { ... }
```

#### `createLambdaDecorator`

Use this factory to create method-level decorators that mark methods as Lambda function handlers. It handles:
- Method metadata reflection.
- Argument injection (Event, Context, Callback).

```typescript
import { createLambdaDecorator } from '@lafken/common';

export const MyLambdaTrigger = <T>(props: T) =>
  createLambdaDecorator({
    getLambdaMetadata: (props, methodName) => ({
      ...props,
      name: methodName,
    }),
  })(props);

// Usage
class MyService {
  @MyLambdaTrigger({ ... })
  handleRequest(@Event() event: any) { ... }
}
```

### Metadata Utilities

`@lafken/common` provides utilities to read the metadata stored by these decorators, which resolvers use to build the actual infrastructure.

- `getResourceMetadata(target)`: Retrieves metadata from a resource class.
- `getResourceHandlerMetadata(target)`: Retrieves metadata for all lambda handlers in a class.

## Usage

This package is intended for internal use within the Lafken framework or for advanced users extending the framework with custom resource types. It ensures consistent metadata handling across all `@lafken/*` packages.
