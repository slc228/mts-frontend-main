import requests from '../../requests';

const getProgrammeOrigins = async () => {
  const url = encodeURI(`${requests.getProgrammeOrigins.url}`);
  const response = await fetch(url, {
    method: requests.getProgrammeOrigins.method,
  });
  const rawResult = response.status === 200 ? await response.json() : [];
  return rawResult;
};

export default getProgrammeOrigins;