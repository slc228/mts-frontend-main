import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getOverallData360 = async (keyword, pageId) => {
  console.log(keyword);
  console.log(pageId);
  const params = {
    keyword,
    pageId,
  };
  const url = encodeURI(`${requests.getOverallData360.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getOverallData360.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  return rawResult;
};

export default getOverallData360;
