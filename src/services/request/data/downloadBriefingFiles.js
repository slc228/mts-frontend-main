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
  const link = document.createElement('a');
  link.href = url;
  const filename = 'a.doc';
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
};

export default downloadBriefingFiles;
