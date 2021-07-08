import requests from '../../requests';

const login = async (userName, password, role) => {
  const url = encodeURI(`${requests.login.url}`);
  const response = await fetch(url, {
    method: requests.login.method,
    body: JSON.stringify({
      username: userName,
      password,
      role,
    }),
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': 'http://202.120.40.69:28082',
      'Access-Control-Allow-Headers': true,
    },
  });
  const result = response.status === 200 ? await response.json() : {};
  console.log(result);
  return result;
};

export default login;
