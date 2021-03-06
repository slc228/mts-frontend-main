import qs from 'qs';
import requests from '../../requests';

const getMaterialDetail = async (fid, materiallib) => {
  const params = {
    fid,
    materiallib,
  };
  const url = encodeURI(`${requests.getMaterialDetail.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getMaterialDetail.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getMaterialDetail;
