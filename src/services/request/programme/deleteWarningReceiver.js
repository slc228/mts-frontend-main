import qs from 'qs';
import requests from '../../requests';

const deleteWarningReceiver = async (id) => {
  const url = encodeURI(`${requests.deleteWarningReceiver.url}?id=${id}`);
  const response = await fetch(url, { method: requests.deleteWarningReceiver.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const ret = rawResult.deleteWarningReceiver;
  return ret;
};

export default deleteWarningReceiver;
