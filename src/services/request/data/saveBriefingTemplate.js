import qs from 'qs';
import requests from '../../requests';

const saveBriefingTemplate = async (id, fid, title, version, institution, time, keylist) => {
  const params = {
    id,
    fid,
    title,
    version,
    institution,
    time,
    keylist: keylist.toString(),
  };
  console.log(params);
  const url = encodeURI(`${requests.saveBriefingTemplate.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.saveBriefingTemplate.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = rawResult.savebriefingtemplate;
  console.log(result);
  return result;
};

export default saveBriefingTemplate;
