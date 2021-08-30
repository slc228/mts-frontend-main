import qs from 'qs';
import requests from '../../requests';

const addNewBriefingFileRecord = async (fid, title) => {
  const params = {
    fid,
    title,
  };
  const url = encodeURI(`${requests.addNewBriefingFileRecord.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.addNewBriefingFileRecord.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default addNewBriefingFileRecord;
