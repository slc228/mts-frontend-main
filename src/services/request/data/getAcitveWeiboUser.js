import requests from '../../requests';

const getActiveWeiboUser = async (fid) => {
  const url = encodeURI(`${requests.getActiveWeiboUser.url}?fid=${fid}`);
  console.log(url);
  const response = await fetch(url, {
    method: requests.getActiveWeiboUser.method,
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  return rawResult;
};

export default getActiveWeiboUser;
