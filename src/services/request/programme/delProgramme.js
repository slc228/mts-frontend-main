import qs from 'qs';
import requests from '../../requests';

const delProgramme = async (fid, username) => {
  const params = { fid, username };
  const url = encodeURI(`${requests.delProgramme.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.delProgramme.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    delProgramme: rawResult.delFangAn,
  };
  return result;
};

export default delProgramme;
