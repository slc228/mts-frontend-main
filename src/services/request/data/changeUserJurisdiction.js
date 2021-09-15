import qs from 'qs';
import requests from '../../requests';

const changeUserJurisdiction = async (username, type, checked) => {
  const params = {
    username,
    type,
    checked,
  };
  const url = encodeURI(`${requests.changeUserJurisdiction.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.changeUserJurisdiction.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default changeUserJurisdiction;
