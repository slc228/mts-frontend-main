import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getOverallDataWithObject = async (keyword, source, startPublishedDay, endPublishedDay, sensitiveType, emotion, timeOrder, pageSize, pageId, keywords) => {
  const params = {
    keyword,
    timeOrder,
    pageSize,
    resource: source,
    sensitiveType,
    emotion,
    page: pageId,
    keywords: keywords ? JSON.stringify(keywords) : '[]',
  };
  console.log(params);
  const url = encodeURI(`${requests.getOverallDataWithObject.url}?${qs.stringify(params)}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getOverallDataWithObject.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    dataSize: rawResult.hitNumber,
    data: rawResult.yuQingContent ? rawResult.yuQingContent.map((item) => ({
      source: item.fromType,
      addr: item.resource,
      url: item.webpageUrl,
      sensi: item.cflag,
      publishedDay: moment(item.publishedDay).format(DATE_FORMAT),
      ...item,
    })) : [],
  };
  console.log(result);
  return result;
};

export default getOverallDataWithObject;
