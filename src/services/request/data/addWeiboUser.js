import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const addWeiboUser = async (fid, id, nickname) => {
  const params = {
    fid,
    id,
    nickname,
  };
  const url = encodeURI(`${requests.addWeiboUser.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.addWeiboUser.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    addWeiboUser: rawResult.addweibouser,
  };
  return result;
};

export default addWeiboUser;
