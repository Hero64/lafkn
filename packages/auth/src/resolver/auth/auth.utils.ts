import type { AuthAttributes } from '../../main';

export const mapUserAttributes: Record<keyof AuthAttributes, string> = {
  name: 'name',
  familyName: 'family_name',
  givenName: 'given_name',
  middleName: 'middle_name',
  nickname: 'nickname',
  preferredUsername: 'preferred_username',
  profile: 'profile',
  picture: 'picture',
  website: 'website',
  gender: 'gender',
  birthdate: 'birthdate',
  zoneInfo: 'zoneinfo',
  locale: 'locale',
  updated_at: 'updated_at',
  address: 'address',
  email: 'email',
  phoneNumber: 'phone_number',
  sub: 'sub',
};
