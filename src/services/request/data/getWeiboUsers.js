import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getWeiboUsers = async (fid, WeiboUserForSearch) => {
  const params = {
    fid,
    WeiboUserForSearch,
  };
  const url = encodeURI(`${requests.getWeiboUsers.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getWeiboUsers.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    dataSize: rawResult.hitNumber,
    data: rawResult.WeiboUserContent ? rawResult.WeiboUserContent.map((item) => ({
      id: item.id,
      nickname: item.nickname,
      isadded: item.isadded,
    })) : [],
  };
  return result;
};

export default getWeiboUsers;
