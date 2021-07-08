import requests from '../../requests';

const changeUserState = async (username) => {
  const url = encodeURI(`${requests.changeUserState.url}?username=${username}`);
  const response = await fetch(url, { method: requests.changeUserState.method });
  const result = response.status === 200 ? await response.json() : {};
  return result;
};

export default changeUserState;
