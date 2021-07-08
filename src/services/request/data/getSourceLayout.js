import requests from '../../requests';
import qs from 'qs';

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
  const options = [
    { label: '不限', value: null },
    { label: '网站', value: '1' },
    { label: '论坛', value: '2' },
    { label: '微博', value: '3' },
    { label: '微信', value: '4' },
    { label: '博客', value: '5' },
    { label: '外媒', value: '6' },
    { label: '新闻', value: '7' },
  ];
  const sourceLayout =
    Object.keys(rawResult)
      .map((id) => parseInt(id.slice(-1)))
      .map((id) => ({
        name: options[id].label,
        label: options[id].label,
        value: rawResult[`fromType${id}`],
      })).filter(item => item.value);
  console.log(sourceLayout);
  return sourceLayout;
};

export default getSourceLayout;
