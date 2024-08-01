/** @format */

import { env } from './../env';

const config = {
  serverBaseURL: env.REACT_APP_SERVER_BASE_URL,
  apiTimeout: 30000,
};

export default config;
