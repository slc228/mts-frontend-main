import moment from 'moment';
import qs from 'qs';
import requests from '../../requests';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const getHotArticle = async (pageSize, pageId) => {
  const params = {
    pageSize,
    pageId,
  };
  const url = encodeURI(`${requests.getHotArticle.url}?${qs.stringify(params)}`);
  const response = await fetch(url, { method: requests.getHotArticle.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const result = {
    dataSize: rawResult.hitNumber,
    data: rawResult.hotArticleContent ? rawResult.hotArticleContent.map((item) => ({
      title: item.title,
      heat: item.heat,
      url: item.url,
      resource: item.resource,
      publishedDay: moment(item.publishedDay).add(8, 'hours').format(DATE_FORMAT),
    })) : [],
  };
  console.log(result);
  return result;
};

export default getHotArticle;
