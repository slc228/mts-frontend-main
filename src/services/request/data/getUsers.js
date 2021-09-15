import requests from '../../requests';

const getUsers = async () => {
  const url = encodeURI(`${requests.getUsers.url}`);
  const response = await fetch(url, {
    method: requests.getUsers.method,
    credentials: 'same-origin',
    headers: {
      'Access-Control-Allow-Credentials': true,
    },
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getUsers;
