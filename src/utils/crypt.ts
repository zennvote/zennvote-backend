import * as crypto from 'crypto';

export const getSalt = () => `${Math.round(new Date().valueOf() * Math.random())}`;

export const encryptPassword = (password: string, salt: string) => {
  return crypto.createHash('sha512').update(password + salt).digest('hex');
};
