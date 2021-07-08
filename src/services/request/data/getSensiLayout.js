import requests from '../../requests';
import qs from 'qs';

const getSensiLayout = async (keyword, startPublishedDay, endPublishedDay) => {
  const params = {
    keyword,
    startPublishedDay,
    endPublishedDay,
  };
  // const url = encodeURI(`${requests.getSensiLayout.url}?keyword=${keyword}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const url = encodeURI(`${requests.getSensiLayout.url}?keyword=${keyword}&startPublishedDay=&endPublishedDay=`);
  const response = await fetch(url, { method: requests.getSensiLayout.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  /* const options = [
    { label: '不限', value: null },
    { label: '敏感', value: '1' },
    { label: '非敏感', value: '2' },
  ];
  const sensiLayout =
    Object.keys(rawResult)
      .map((id) => ({
        name: options[id].label,
        label: options[id].label,
        value: rawResult[id],
      })); */
  const sensiLayout = [
    { name: '敏感', label: '敏感', value: rawResult.cflag1 },
    { name: '非敏感', label: '非敏感', value: rawResult.cflag0 },
  ].filter(item => item.value);
  return sensiLayout;
};

export default getSensiLayout;
