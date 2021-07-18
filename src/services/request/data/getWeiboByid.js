import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getWeiboByid = async (fid, id) => {
  const params = {
    fid,
    id,
  };
  const url = encodeURI(`${requests.getWeiboByid.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getWeiboByid.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  return rawResult;
};

export default getWeiboByid;
