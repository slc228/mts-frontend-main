import qs from 'qs';
import requests from '../../requests';

const getBriefingFiles = async (fid) => {
  const params = {
    fid,
  };
  const url = encodeURI(`${requests.getBriefingFiles.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getBriefingFiles.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getBriefingFiles;
