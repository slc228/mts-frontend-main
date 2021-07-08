import requests from '../../requests';

const getSensitiveData = async (fid) => {
  const url = encodeURI(`${requests.getSensitiveData.url}?fid=${fid}`);
  const response = await fetch(url, { method: requests.getSensitiveData.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(url, rawResult);
  return rawResult;
};

export default getSensitiveData;
