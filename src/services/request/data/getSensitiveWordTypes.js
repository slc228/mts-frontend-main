import qs from 'qs';
import moment from 'moment';
import requests from '../../requests';

const getSensitiveWordTypes = async () => {
  const url = encodeURI(`${requests.getSensitiveWordTypes.url}`);
  const response = await fetch(url, { method: requests.getSensitiveWordTypes.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getSensitiveWordTypes;
