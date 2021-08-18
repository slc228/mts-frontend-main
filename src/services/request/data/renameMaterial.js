import qs from 'qs';
import requests from '../../requests';

const renameMaterial = async (fid, oldname, newname) => {
  const params = {
    fid,
    oldname,
    newname,
  };
  const url = encodeURI(`${requests.renameMaterial.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.renameMaterial.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default renameMaterial;
