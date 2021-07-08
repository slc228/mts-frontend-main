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
  const result = rawResult.map((item) => ({
    ...item,
    userName: item.username,
    userType: item.role === '0' ? 'admin' : 'default',
  }));
  return result;
};

export default getUsers;
