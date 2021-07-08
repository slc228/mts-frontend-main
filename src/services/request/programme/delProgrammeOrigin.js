import requests from '../../requests';

const delProgrammeOrigins = async (oid) => {
  const url = encodeURI(`${requests.delProgrammeOrigin.url}?id=${oid}`);
  const response = await fetch(url, {
    method: requests.delProgrammeOrigin.method,
  });
  const rawResult = response.status === 200 ? await response.json() : [];
  return rawResult;
};

export default delProgrammeOrigins;