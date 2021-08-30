import qs from 'qs';
import requests from '../../requests';

const updateBriefingFileProgess = async (id, percent) => {
  const params = {
    id,
    percent,
  };
  const url = encodeURI(`${requests.updateBriefingFileProgess.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.updateBriefingFileProgess.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default updateBriefingFileProgess;
