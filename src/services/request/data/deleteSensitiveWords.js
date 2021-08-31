import qs from 'qs';
import requests from '../../requests';

const deleteSensitiveWords = async (type, words) => {
  const params = {
    type,
    words: words.toString(),
  };
  const url = encodeURI(`${requests.deleteSensitiveWords.url}`);
  const response = await fetch(url, {
    method: requests.deleteSensitiveWords.method,
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default deleteSensitiveWords;
