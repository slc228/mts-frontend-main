import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getOverallDataBing = async (keyword, pageId) => {
  const params = {
    keyword,
    pageId,
  };
  const url = encodeURI(`${requests.getOverallDataBing.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getOverallDataBing.method });
  const rawResult = response.status === 200 ? await response.json() : [];
  return rawResult;
};

export default getOverallDataBing;
