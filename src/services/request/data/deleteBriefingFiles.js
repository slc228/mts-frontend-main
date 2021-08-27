import qs from 'qs';
import requests from '../../requests';

const deleteBriefingFiles = async (id) => {
  const params = {
    id,
  };
  const url = encodeURI(`${requests.deleteBriefingFiles.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.deleteBriefingFiles.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default deleteBriefingFiles;
