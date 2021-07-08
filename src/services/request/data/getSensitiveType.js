import requests from '../../requests';

const getSensitiveType = async (contents) => {
  // const url = encodeURI(`${requests.getKeywordsCloud.url}?${qs.stringify(params)}`);
  const url = encodeURI(requests.getSensitiveType.url);
  const data = { textList: contents };
  const response = await fetch(url, {
    method: requests.getSensitiveType.method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  return {
    result: rawResult,
  };
};

export default getSensitiveType;
