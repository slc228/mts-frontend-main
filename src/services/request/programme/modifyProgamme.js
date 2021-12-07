import { string } from 'prop-types';
import requests from '../../requests';

const modifyProgramme = async (rawData) => {
  const data = {
    fid: rawData.fid,
    enableAlert: rawData.enableAlert,
    matchType: rawData.keywordMatch === 'or' ? 0 : 1,
    regionKeyword: rawData.regionKeywords,
    eventKeyword: JSON.stringify(rawData.eventKeywords),
    roleKeyword: rawData.roleKeywords,
    roleKeywordMatch: rawData.roleMatch === 'or' ? 0 : 1,
    eventKeywordMatch: rawData.eventMatch === 'or' ? 0 : 1,
    regionKeywordMatch: rawData.regionMatch === 'or' ? 0 : 1,
    username: rawData.userName,
    programmeName: rawData.name,
    sensitiveWord: rawData.sensitiveWord,
    priority: rawData.priority,
  };
  const url = encodeURI(`${requests.modifyProgramme.url}`);
  const response = await fetch(url, {
    method: requests.modifyProgramme.method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    modifyProgramme: rawResult.changeFangAn,
  };
  return result;
};

export default modifyProgramme;
