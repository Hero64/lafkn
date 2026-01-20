import { Attributes, Custom, Standard } from '@lafkn/auth/main';

@Attributes()
export class UserPoolAttributes {
  @Standard()
  name: string;

  @Standard()
  familyName: string;

  @Standard()
  email: string;

  @Standard()
  phoneNumber: string;

  @Custom()
  foo: string;

  @Custom()
  bar: number;
}
