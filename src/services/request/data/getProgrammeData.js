import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const getProgrammeData = async (fid, keyword, source, startPublishedDay, endPublishedDay, sensitiveType, emotion, timeOrder, pageSize, pageId) => {
  const params = {
    fid,
    keyword,
    timeOrder,
    pageSize,
    resource: source,
    sensitiveType,
    emotion,
    page: pageId,
  };
  const url = encodeURI(`${requests.getProgrammeData.url}?${qs.stringify(params)}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getProgrammeData.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    dataSize: rawResult.hitNumber,
    data: rawResult.yuQingContent ? rawResult.yuQingContent : [],
  };
  return result;
};

export default getProgrammeData;
