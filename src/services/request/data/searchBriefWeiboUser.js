import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const searchBriefWeiboUser = async (fid, WeiboUserForSearch) => {
  const params = {
    fid,
    WeiboUserForSearch,
  };
  const url = encodeURI(`${requests.searchBriefWeiboUser.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.searchBriefWeiboUser.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default searchBriefWeiboUser;
