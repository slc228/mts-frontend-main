import qs from 'qs';
import requests from '../../requests';

const deleteBriefingTemplate = async (id) => {
  const params = {
    id,
  };
  console.log(params);
  const url = encodeURI(`${requests.deleteBriefingTemplate.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.deleteBriefingTemplate.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  const result = rawResult.deletebriefingtemplate;
  return result;
};

export default deleteBriefingTemplate;
