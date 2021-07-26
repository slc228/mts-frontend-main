import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const deleteWeiboUser = async (fid, id, nickname) => {
  const params = {
    fid,
    id,
    nickname,
  };
  console.log(params);
  const url = encodeURI(`${requests.deleteWeiboUser.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.deleteWeiboUser.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  const result = {
    deleteWeiboUser: rawResult.deleteWeiboUser,
  };
  return result;
};

export default deleteWeiboUser;
