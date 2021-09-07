import qs from 'qs';
import requests from '../../requests';

const changeUserEventLimiter = async (username, eventLimiter) => {
  const params = {
    username,
    eventLimiter,
  };
  const url = encodeURI(`${requests.changeUserEventLimiter.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.changeUserEventLimiter.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default changeUserEventLimiter;
