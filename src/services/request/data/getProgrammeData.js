import moment from 'moment';
import requests from '../../requests';
import qs from 'qs';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getProgrammeData = async (fid, keyword, source, startPublishedDay, endPublishedDay, sensi, timeOrder, pageSize, pageId) => {
  const params = {
    fid,
    keyword,
    timeOrder,
    pageSize,
    fromType: source,
    cflag: sensi,
    page: pageId,
  };
  const url = encodeURI(`${requests.getProgrammeData.url}?${qs.stringify(params)}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getProgrammeData.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    dataSize: rawResult.hitNumber,
    data: rawResult.dataContent ? rawResult.dataContent.map((item) => ({
      source: item.fromType,
      addr: item.resource,
      url: item.webpageUrl,
      sensi: item.cflag,
      publishedDay: moment(item.publishedDay).add(8, 'hours').format(DATE_FORMAT),
      ...item,
    })) : [],
  };
  return result;
};

export default getProgrammeData;
