import requests from '../../requests';

const getSensitiveWord = async (text) => {
  const url = encodeURI(`${requests.getSensitiveWord.url}`);
  const response = await fetch(url, {
    method: requests.getSensitiveWord.method,
    body: JSON.stringify({ text }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = response.status === 200 ? await response.json() : {};
  return result;
};

export default getSensitiveWord;
