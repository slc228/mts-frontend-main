import qs from 'qs';
import requests from '../../requests';

const getTraceTree = async (fid, startPublishedDay, endPublishedDay) => {
  const params = {
    fid,
    startPublishedDay,
    endPublishedDay,
  };
  const url = encodeURI(`${requests.getTraceTree.url}?fid=${fid}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getTraceTree.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getTraceTree;
