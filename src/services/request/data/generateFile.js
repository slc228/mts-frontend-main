import qs from 'qs';
import requests from '../../requests';

const generateFile = async (fid, templateId, title, institution, yuQingIds, echartsData) => {
  const params = {
    fid,
    templateId,
    title,
    institution,
    yuQingIds: yuQingIds.toString(),
    echartsData: JSON.stringify(echartsData),
  };
  const url = encodeURI(`${requests.generateFile.url}`);
  const response = await fetch(url, {
    method: requests.generateFile.method,
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult.generateFile;
};

export default generateFile;
