import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getFangAnMonitor = async (fid) => {
  const params = {
    fid,
  };
  const url = encodeURI(`${requests.getFangAnMonitor.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getFangAnMonitor.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getFangAnMonitor;
