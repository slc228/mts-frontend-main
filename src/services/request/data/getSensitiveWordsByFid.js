import qs from 'qs';
import requests from '../../requests';

const getSensitiveWordsByFid = async (fid) => {
  const params = {
    fid,
  };
  const url = encodeURI(`${requests.getSensitiveWordsByFid.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getSensitiveWordsByFid.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getSensitiveWordsByFid;
