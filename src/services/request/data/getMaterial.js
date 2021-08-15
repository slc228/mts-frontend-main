import qs from 'qs';
import requests from '../../requests';

const getMaterial = async (fid) => {
  const params = {
    fid,
  };
  const url = encodeURI(`${requests.getMaterial.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getMaterial.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getMaterial;
