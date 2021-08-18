import qs from 'qs';
import requests from '../../requests';

const addNewMaterialLib = async (fid, materiallib) => {
  const params = {
    fid,
    materiallib,
  };
  const url = encodeURI(`${requests.addNewMaterialLib.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.addNewMaterialLib.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default addNewMaterialLib;
