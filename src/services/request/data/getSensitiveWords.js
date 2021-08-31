import qs from 'qs';
import moment from 'moment';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getSensitiveWords = async (type) => {
  const params = {
    type,
  };
  const url = encodeURI(`${requests.getSensitiveWords.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getSensitiveWords.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = rawResult.length > 0 ? rawResult.map((item) => ({
    id: item.id,
    type: item.type,
    label: item.word,
    value: item.word,
  })) : [];
  return result;
};

export default getSensitiveWords;
