import moment from 'moment';
import requests from '../../requests';
import qs from 'qs';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getOverallData = async (keyword, source, startPublishedDay, endPublishedDay, sensi, timeOrder, pageSize, pageId) => {
  const params = {
    keyword,
    timeOrder,
    pageSize,
    fromType: source,
    cflag: sensi,
    page: pageId,
  };
  const url = encodeURI(`${requests.getOverallData.url}?${qs.stringify(params)}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getOverallData.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    dataSize: rawResult.hitNumber,
    data: rawResult.dataContent ? rawResult.dataContent.map((item) => ({
      source: item.fromType,
      addr: item.resource,
      url: item.webpageUrl,
      sensi: item.cflag,
      publishedDay: moment(item.publishedDay).format(DATE_FORMAT),
      ...item,
    })) : [],
  };
  return result;
};

export default getOverallData;
