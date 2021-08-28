import qs from 'qs';
import requests from '../../requests';

const downloadBriefingFiles = async (id, type) => {
  console.log(id);
  console.log(type);
  const params = {
    id,
    type,
  };
  const url = encodeURI(`${requests.downloadBriefingFiles.url}?${qs.stringify(params)}`);
  // console.log(url);
  // const xhr = new XMLHttpRequest();
  // xhr.open('GET', url, true);
  // xhr.send();
  // const response = await fetch(url, { method: requests.downloadBriefingFiles.method });
  // const blob = response.blob();
  const link = document.createElement('a');
  link.href = url;

  const filename = 'a.doc';
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();

  // const rawResult = response.status === 200 ? await response.json() : {};
  // return rawResult;
};

export default downloadBriefingFiles;
