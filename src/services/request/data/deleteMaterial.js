import qs from 'qs';
import requests from '../../requests';

const deleteMaterial = async (fid, materiallib) => {
  const params = {
    fid,
    materiallib,
  };
  const url = encodeURI(`${requests.deleteMaterial.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.deleteMaterial.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default deleteMaterial;
