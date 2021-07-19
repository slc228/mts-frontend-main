import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getOverallDatOnNetwork = async (keyword, pageId) => {
  console.log('here');
  const params = {
    keyword,
    pageId,
  };
  const url = encodeURI(`${requests.getOverallDatOnNetwork.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getOverallDatOnNetwork.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  return rawResult;
};

export default getOverallDatOnNetwork;
