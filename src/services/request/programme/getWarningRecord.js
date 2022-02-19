import qs from 'qs';
import requests from '../../requests';

const getWarningRecord = async (fid, type, start, end) => {
  const params = {
    fid,
    type,
    start,
    end,
  };
  const url = encodeURI(`${requests.getAllWarningRecord.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getAllWarningRecord.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getWarningRecord;
