import requests from '../../requests';

const getContentTag = async (contents, pageId) => {
  // const url = encodeURI(`${requests.getKeywordsCloud.url}?${qs.stringify(params)}`);
  const url = encodeURI(requests.getContentTag.url);
  const data = { textList: contents };
  const response = await fetch(url, {
    method: requests.getContentTag.method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  return {
    result: rawResult,
    pageId,
  };
};

export default getContentTag;
