import qs from 'qs';
import requests from '../../requests';

const addWarningReceiver = async (fid, name, phone, email, wechat) => {
  const params = {
    fid,
    name,
    phone,
    email,
    wechat,
  };
  const url = encodeURI(`${requests.addWarningReceiver.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.addWarningReceiver.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const ret = rawResult.addWarningReceiver;
  return ret;
};

export default addWarningReceiver;
