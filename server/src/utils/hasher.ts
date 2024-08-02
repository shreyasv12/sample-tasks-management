/** @format */

import crypto from 'crypto';

import config from '../config/config';

export async function getPasswordHash(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, config.hasher.salt, 10000, 32, 'sha1', function (err, derivedKey) {
      if (err) {
        return reject(err);
      }
      const hash = Buffer.from(derivedKey).toString('hex');
      resolve(hash);
    });
  });
}
