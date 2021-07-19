import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getOverallDataBaidu = async (keyword, pageId) => {
  console.log(keyword);
  console.log(pageId);
  const params = {
    keyword,
    pageId,
  };
  const url = encodeURI(`${requests.getOverallDataBaidu.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getOverallDataBaidu.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  return rawResult;
};

export default getOverallDataBaidu;
