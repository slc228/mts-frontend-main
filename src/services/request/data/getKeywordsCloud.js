import moment from 'moment';
import requests from '../../requests';
import qs from 'qs';

const getKeywordsCloud = async (fid, startPublishedDay, endPublishedDay, keywordNumber) => {
  // const url = encodeURI(`${requests.getKeywordsCloud.url}?${qs.stringify(params)}`);
  const url = encodeURI(`${requests.getKeywordsCloud.url}?fid=${fid}&startPublishedDay=&endPublishedDay=&keywordNumber=${encodeURI(keywordNumber)}&extractMethod=textrank`);
  const response = await fetch(url, { method: requests.getKeywordsCloud.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult instanceof Array ? rawResult : [];
};

export default getKeywordsCloud;
