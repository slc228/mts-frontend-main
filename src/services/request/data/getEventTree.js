import moment from 'moment';
import requests from '../../requests';
import qs from 'qs';

const getEventTree = async (fid, startPublishedDay, endPublishedDay) => {
  // const url = encodeURI(`${requests.getKeywordsCloud.url}?${qs.stringify(params)}`);
  const url = encodeURI(`${requests.getEventTree.url}?fid=${fid}&startPublishedDay=&endPublishedDay=`);
  console.log(url);
  const response = await fetch(url, { method: requests.getEventTree.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  return rawResult;
};

export default getEventTree;
