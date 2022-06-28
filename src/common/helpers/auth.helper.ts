import { pbkdf2Sync, randomBytes } from 'crypto';

export const generateSalt = (): string => {
  return randomBytes(16).toString('hex');
};

export const encryptBySalt = (input: string, salt: string): string => {
  return pbkdf2Sync(input, salt, 1000, 64, 'sha256').toString('hex');
};
