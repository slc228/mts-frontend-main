import qs from 'qs';
import requests from '../../requests';

const modeifyMaterial = async (fid, ids) => {
  const params = {
    fid,
    ids: ids.toString(),
  };
  const url = encodeURI(`${requests.modeifyMaterial.url}`);
  const response = await fetch(url, {
    method: requests.modeifyMaterial.method,
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult.modeifyMaterial;
};

export default modeifyMaterial;
