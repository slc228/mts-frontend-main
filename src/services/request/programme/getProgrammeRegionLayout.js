import qs from 'qs';
import requests from '../../requests';

const getProgrammeRegionLayout = async (fid, startPublishedDay, endPublishedDay) => {
  const params = {
    fid,
    startPublishedDay,
    endPublishedDay,
  };
  const url = encodeURI(`${requests.getProgrammeRegionLayout.url}?fid=${fid}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getProgrammeRegionLayout.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);

  const regionMap = new Map();
  // eslint-disable-next-line no-lone-blocks
  {
    regionMap.set(11, '北京');
    regionMap.set(12, '天津');
    regionMap.set(13, '河北');
    regionMap.set(14, '山西');
    regionMap.set(15, '内蒙古');
    regionMap.set(21, '辽宁');
    regionMap.set(22, '吉林');
    regionMap.set(23, '黑龙江');
    regionMap.set(31, '上海');
    regionMap.set(32, '江苏');
    regionMap.set(33, '浙江');
    regionMap.set(34, '安徽');
    regionMap.set(35, '福建');
    regionMap.set(36, '江西');
    regionMap.set(37, '山东');
    regionMap.set(41, '河南');
    regionMap.set(42, '湖北');
    regionMap.set(43, '湖南');
    regionMap.set(44, '广东');
    regionMap.set(45, '广西');
    regionMap.set(46, '海南');
    regionMap.set(50, '重庆');
    regionMap.set(51, '四川');
    regionMap.set(52, '贵州');
    regionMap.set(53, '云南');
    regionMap.set(54, '西藏');
    regionMap.set(61, '陕西');
    regionMap.set(62, '甘肃');
    regionMap.set(63, '青海');
    regionMap.set(64, '宁夏');
    regionMap.set(65, '新疆');
    regionMap.set(71, '台湾');
    regionMap.set(81, '香港');
    regionMap.set(91, '澳门');
  }

  const regionLayout = Object.keys(rawResult)
    .map(key => parseInt(key.slice(-2), 10))
    .map(key => ({
      name: regionMap.get(key),
      value: rawResult[`from${key}`],
    }));
  let totals = 0;
  let cnt = 0;
  let min = regionLayout[0]?.value || 0;
  let max = 0;
  regionLayout.forEach((item) => {
    totals += item.value;
    cnt += 1;
    if (item.value < min) min = item.value;
    if (item.value > max) max = item.value;
  });
  console.log(regionLayout);
  return {
    regions: regionLayout,
    min,
    max,
  };
};

export default getProgrammeRegionLayout;
