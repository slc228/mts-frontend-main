import requests from '../../requests';
import qs from 'qs';

const getProgrammeSummary = async (fid, startPublishedDay, endPublishedDay) => {
  const url = encodeURI(`${requests.getProgrammeSummary.url}?fid=${fid}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getProgrammeSummary.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  return rawResult;
};

export default getProgrammeSummary;
