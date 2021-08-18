import qs from 'qs';
import requests from '../../requests';

const deleteMaterialIDs = async (fid, materiallib, ids) => {
  const params = {
    fid,
    materiallib,
    ids: ids.toString(),
  };
  const url = encodeURI(`${requests.deleteMaterialIDs.url}`);
  const response = await fetch(url, {
    method: requests.deleteMaterialIDs.method,
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default deleteMaterialIDs;
