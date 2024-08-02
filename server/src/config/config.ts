/** @format */

import 'dotenv/config';

const ENV = process.env;

export default {
  port: ENV.APP_PORT || 80,
  appWhiteListDomains: (ENV.APP_WHITE_LIST_DOMAIN_ORIGIN || '').split(', '),

  mongoDB: {
    host: ENV.MONGO_HOST,
  },

  hasher: {
    salt: 'salt',
    algorithm: 'aes-128-cbc',
    ivString: '1234567890123456',
  },
  jwt: {
    secret: 'task-management',
    expiresIn: '7d', // Eg: 60, "2 days", "10h", "7d" */
  },
};
