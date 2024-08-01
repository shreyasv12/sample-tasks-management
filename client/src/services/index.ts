/** @format */

import axios from 'axios';
import CONFIG from '../config/config';

let timezone = null;

try {
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
} catch (err) {
  console.error('ERRO IN TIMEZONE', err);
}

export default axios.create({
  baseURL: CONFIG.serverBaseURL,
  timeout: CONFIG.apiTimeout,
  withCredentials: true,
  headers: {
    'x-api-timezone': timezone || '',
  },
});
