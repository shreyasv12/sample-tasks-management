import AxiosInstance from './index';

export const submitLoginCreds = async (username: string, password: string) => {
  const res = await AxiosInstance({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password,
    }
  });

  return res.data || {};
};

export const fetchUserLoggedInInfo = async (sessionId: string) => {
  const res = await AxiosInstance({
    url: '/loggedIn',
    headers: {
      'x-api-key': sessionId,
    },
  });

  return res.data || {};
};
