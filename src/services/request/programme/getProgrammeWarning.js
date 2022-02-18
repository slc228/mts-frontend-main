import qs from 'qs';
import requests from '../../requests';

const getProgrammeWarning = async (fid) => {
  const url = encodeURI(`${requests.getProgrammeWarning.url}?fid=${fid}`);
  const response = await fetch(url, { method: requests.getProgrammeWarning.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getProgrammeWarning;
