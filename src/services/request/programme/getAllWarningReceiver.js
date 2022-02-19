import qs from 'qs';
import requests from '../../requests';

const getAllWarningReceiver = async (fid) => {
  const url = encodeURI(`${requests.getAllWarningReceiver.url}?fid=${fid}`);
  const response = await fetch(url, { method: requests.getAllWarningReceiver.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  return rawResult;
};

export default getAllWarningReceiver;
