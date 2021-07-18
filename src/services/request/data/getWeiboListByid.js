import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getWeiboListByid = async (fid, weibouserid) => {
  const params = {
    fid,
    weibouserid
  };
  const url = encodeURI(`${requests.getWeiboListByid.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getWeiboListByid.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  return rawResult;
};

export default getWeiboListByid;
