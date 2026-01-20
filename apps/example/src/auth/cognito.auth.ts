import { CognitoAuthorizer } from '@lafkn/api/main';

@CognitoAuthorizer({
  userPool: 'example-user-pool',
  name: 'cognito-auth',
})
export class CognitoAuth {}
