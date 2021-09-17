import qs from 'qs';
import requests from '../../requests';

const getSourceLayout = async (keyword, startPublishedDay, endPublishedDay) => {
  const params = {
    keyword,
    startPublishedDay,
    endPublishedDay,
  };
  // const url = encodeURI(`${requests.getSourceLayout.url}?keyword=${keyword}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const url = encodeURI(`${requests.getSourceLayout.url}?keyword=${keyword}&startPublishedDay=&endPublishedDay=`);
  const response = await fetch(url, { method: requests.getSourceLayout.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  return rawResult;
};

export default getSourceLayout;
