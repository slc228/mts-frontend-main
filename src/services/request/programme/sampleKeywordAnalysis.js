import requests from '../../requests';

const sampleKeywordAnalysis = async (fid, text) => {
  const url = encodeURI(requests.sampleKeywordAnalysis.url);
  const data = { fid, text };
  const response = await fetch(url, {
    method: requests.sampleKeywordAnalysis.method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default sampleKeywordAnalysis;
