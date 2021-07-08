import requests from '../../requests';

const logout = async () => {
  const url = encodeURI(`${requests.logout.url}`);
  const response = await fetch(url, { method: requests.logout.method });
  const result = response.status === 200 ? await response.json() : {};
  return result;
};

export default logout;
