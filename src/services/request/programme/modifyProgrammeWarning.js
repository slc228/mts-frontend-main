import qs from 'qs';
import requests from '../../requests';

const modifyProgrammeWarning = async (fid, warningSwitch, words, sensitiveAttribute, similarArticle, area, sourceSite, result, involve,
  matchingWay, weiboType, deWeight, filtrate, informationType, warningType) => {
  const params = {
    fid,
    warningSwitch,
    words,
    sensitiveAttribute,
    similarArticle,
    area,
    sourceSite,
    result,
    involve,
    matchingWay,
    weiboType,
    deWeight,
    filtrate,
    informationType,
    warningType,
  };
  const url = encodeURI(`${requests.modifyProgrammeWarning.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.modifyProgrammeWarning.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const ret = rawResult.modifyWarning;
  return ret;
};

export default modifyProgrammeWarning;
