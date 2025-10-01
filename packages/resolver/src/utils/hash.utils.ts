import crypto from 'node:crypto';

export const createMd5Hash = (value: string) => {
  return crypto.createHash('md5').update(value).digest('hex');
};

export const createSha1 = () => {
  return crypto.randomBytes(20).toString('hex');
};
