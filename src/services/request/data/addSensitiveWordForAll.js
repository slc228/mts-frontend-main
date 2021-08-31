import qs from 'qs';
import requests from '../../requests';

const addSensitiveWordForAll = async (type, word) => {
  const params = {
    type,
    word,
  };
  const url = encodeURI(`${requests.addSensitiveWordForAll.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.addSensitiveWordForAll.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default addSensitiveWordForAll;
