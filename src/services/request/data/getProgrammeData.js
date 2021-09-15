import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getProgrammeData = async (fid, keyword, source, startPublishedDay, endPublishedDay, sensi, emotion, timeOrder, pageSize, pageId) => {
  const params = {
    fid,
    keyword,
    timeOrder,
    pageSize,
    fromType: source,
    sensitiveType: sensi,
    emotion,
    page: pageId,
  };
  console.log(params);
  const url = encodeURI(`${requests.getProgrammeData.url}?${qs.stringify(params)}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getProgrammeData.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    dataSize: rawResult.hitNumber,
    data: rawResult.dataContent ? rawResult.dataContent : [],
  };
  return result;
};

export default getProgrammeData;
