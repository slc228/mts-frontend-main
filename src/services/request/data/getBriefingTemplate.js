import qs from 'qs';
import moment from 'moment';
import { array } from 'prop-types';
import requests from '../../requests';

const getBriefingTemplate = async (fid) => {
  const params = {
    fid,
  };
  const url = encodeURI(`${requests.getBriefingTemplate.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getBriefingTemplate.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getBriefingTemplate;
