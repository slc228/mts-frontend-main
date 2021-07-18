import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

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
    data: rawResult.dataContent ? rawResult.dataContent : [],
  };
  console.log(result.data);
  return result;
};

export default getOverallData;
