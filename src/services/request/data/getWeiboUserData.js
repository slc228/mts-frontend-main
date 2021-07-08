import moment from 'moment';
import requests from '../../requests';
import qs from 'qs';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getWeiboUserData = async (fid, username, pageSize, pageId) => {
  const params = {
    fid,
    username,
    pageSize,
    pageId,
  };
  const url = encodeURI(`${requests.getWeiboUserData.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getWeiboUserData.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    dataSize: rawResult.hitNumber,
    data: rawResult.dataContent ? rawResult.dataContent.map((item) => ({
      source: item.fromType,
      addr: item.resource,
      url: item.webpageUrl,
      sensi: item.cflag,
      publishedDay: moment(item.publishedDay).add(8, 'hours').format(DATE_FORMAT),
      ...item,
    })) : [],
  };
  return result;
};

export default getWeiboUserData;
