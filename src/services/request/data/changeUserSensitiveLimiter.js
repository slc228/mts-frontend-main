import qs from 'qs';
import requests from '../../requests';

const changeUserSensitiveLimiter = async (username, sensitiveLimiter) => {
  const params = {
    username,
    sensitiveLimiter,
  };
  const url = encodeURI(`${requests.changeUserSensitiveLimiter.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.changeUserSensitiveLimiter.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default changeUserSensitiveLimiter;
