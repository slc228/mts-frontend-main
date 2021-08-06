import qs from 'qs';
import moment from 'moment';
import { array } from 'prop-types';
import requests from '../../requests';

const getBriefingTemplate = async (fid) => {
  const params = {
    fid,
  };
  console.log(params);
  const url = encodeURI(`${requests.getBriefingTemplate.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getBriefingTemplate.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  /* const result = rawResult ? rawResult.map((item) => ({
    id: item.id,
    fid: item.fid,
    institution: item.institution,
    keylist: new array(item.keylist),
    time: item.time,
    title: item.title,
    version: item.version,
  }
  )) : [];
  console.log(qs.parse(rawResult[0].keylist)); */
  return rawResult;
};

export default getBriefingTemplate;
