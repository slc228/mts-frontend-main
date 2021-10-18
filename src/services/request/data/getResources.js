import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getResources = async () => {
  const url = encodeURI(requests.getResources.url);
  const response = await fetch(url, { method: requests.getResources.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getResources;
