import requests from '../../requests';

const getEventKeyWordByFid = async (fid) => {
  const url = encodeURI(`${requests.getEventKeyWordByFid.url}`);
  const response = await fetch(url, {
    method: requests.getEventKeyWordByFid.method,
    body: JSON.stringify({ fid }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = response.status === 200 ? await response.json() : {};
  return result;
};

export default getEventKeyWordByFid;
