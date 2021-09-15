import requests from '../../requests';

const register = async (userName, password, email, phone, role) => {
  const url = encodeURI(`${requests.register.url}`);
  const response = await fetch(url, {
    method: requests.register.method,
    body: JSON.stringify({
      username: userName,
      password,
      email,
      phone,
      role,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = response.status === 200 ? await response.json() : {};
  return result;
};

export default register;
