# @lafken/auth

`@lafken/auth` simplifies the creation and management of Amazon Cognito User Pools and User Pool Clients. It allows you to configure authentication flows, password policies, and standard attributes, as well as extend functionality using Lambda triggers through extensions.

## Installation

```bash
npm install @lafken/auth
```

## Configuration

Add the `AuthResolver` from the `@lafken/auth/resolver` library to your application configuration.

```typescript
import { AuthResolver } from '@lafken/auth/resolver';

createApp({
  name: 'awesome-app',
  resolvers: [
    new AuthResolver({
      name: 'my-auth',
      userPool: {
        // ... user pool configuration
      },
      userClient: {
        // ... user client configuration
      }
    }),
  ],
  ...
});
```

## Features

### Configuring User Pool and Client

You can fully customize the User Pool and Client behaviors using `userPool` and `userClient` options.

```typescript
new AuthResolver({
  name: 'customer-auth',
  userPool: {
    selfSignUpEnabled: true,
    signInAliases: { email: true },
    passwordPolicy: {
      minimumLength: 8,
      requireUppercase: true,
    },
  },
  userClient: {
    generateSecret: false,
    authFlow: ['ALLOW_USER_PASSWORD_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH'],
  }
})
```

### Extensions (Triggers)

`@lafken/auth` supports extending Cognito functionality using Lambda triggers. You can define "Extensions" which are classes decorated with `@AuthExtension`, containing methods decorated with `@Trigger`.

1.  **Define an Extension:**

```typescript
import { AuthExtension, Trigger } from '@lafken/auth';

@AuthExtension()
export class AuthTriggers {
  @Trigger({ type: 'preSignUp' })
  async preSignUp(event: any) {
    console.log('User is signing up:', event.userName);
    return event;
  }

  @Trigger({ type: 'postConfirmation' })
  async postConfirmation(event: any) {
    console.log('User confirmed:', event.userName);
    return event;
  }
}
```

2.  **Register the Extension:**

Pass the extension class to the `extensions` property in `AuthResolver`.

```typescript
new AuthResolver({
  name: 'app-auth',
  // ... other config
  extensions: [AuthTriggers],
})
```

### Extending with Custom Logic

You can also use the `extend` callback to directly access the underlying CDK/Terraform resources (depending on the provider) or add custom resources related to the auth stack.

```typescript
new AuthResolver({
  name: 'extended-auth',
  extend: ({ userPool, userPoolClient, scope }) => {
    // Access underlying constructs to add advanced configurations
    // or add related resources to the scope
  }
})
```
