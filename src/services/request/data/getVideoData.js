import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const getVideoData = async (fid, videoKeyword, videoSource, videoStartPublishedDay, videoEndPublishedDay, videoTimeOrder, videoPageSize, videoPageId) => {
  const params = {
    fid,
    videoKeyword,
    videoSource,
    videoStartPublishedDay,
    videoEndPublishedDay,
    videoTimeOrder,
    videoPageSize,
    videoPageId,
  };
  const url = encodeURI(`${requests.getVideoData.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getVideoData.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    dataSize: rawResult.hitNumber,
    data: rawResult.dataContent ? rawResult.dataContent : [],
  };
  return result;
};

export default getVideoData;
