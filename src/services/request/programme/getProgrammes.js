import qs from 'qs';
import requests from '../../requests';

const getProgrammes = async (username) => {
  const url = encodeURI(`${requests.getProgrammes.url}?${qs.stringify({ username })}`);
  const response = await fetch(url, { method: requests.getOverallData.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = rawResult.data.map((item) => ({
    fid: item.fid,
    name: item.programmeName,
    keywordMatch: item.matchType,
    regionKeywords: item.regionKeyword,
    eventKeywords: item.eventKeyword,
    roleKeywords: item.roleKeyword,
    regionMatch: item.regionKeywordMatch ? 'and' : 'or',
    eventMatch: item.eventKeywordMatch ? 'and' : 'or',
    roleMatch: item.roleKeywordMatch ? 'and' : 'or',
    enableAlert: item.enableAlert,
    sensitiveWord: item.sensitiveWord,
    // names: item.names,
  }));
  return result;
};

export default getProgrammes;
