import requests from '../../requests';

const addProgramme = async (rawData) => {
  console.log(rawData);
  const data = {
    enableAlert: false, // rawData.enableAlert,
    matchType: 0, // rawData.keywordMatch,
    regionKeyword: '', // rawData.regionKeywords,
    eventKeyword: '', // rawData.eventKeywords,
    roleKeyword: '', // rawData.eventKeywords,
    sensitiveWord: '',
    roleKeywordMatch: 0, // rawData.roleMatch,
    eventKeywordMatch: 0, // rawData.eventMatch,
    regionKeywordMatch: 0, // rawData.regionMatch,
    username: rawData.userName,
    programmeName: rawData.name,
    priority: 1,
  };
  const url = encodeURI(`${requests.addProgramme.url}`);
  const response = await fetch(url, {
    method: requests.addProgramme.method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  const result = {
    addProgramme: rawResult.saveFangAn,
  };
  return result;
};

export default addProgramme;
