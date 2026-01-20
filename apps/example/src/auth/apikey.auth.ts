import { ApiKeyAuthorizer } from '@lafkn/api/main';

@ApiKeyAuthorizer({
  name: 'api-key-auth',
  defaultKeys: ['testing'],
})
export class ApiKeyAuth {}
