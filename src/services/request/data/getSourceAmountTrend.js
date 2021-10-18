import qs from 'qs';
import moment from 'moment';
import requests from '../../requests';

const getSourceAmountTrend = async (keyword, startPublishedDay, endPublishedDay) => {
  const url = encodeURI(`${requests.getSourceAmountTrend.url}?keyword=${keyword}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getSourceAmountTrend.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  const sourceAmountTrend = {
    yAxis: rawResult.timeRange ? rawResult.timeRange.map((str) => {
      const moments = str.split(' to ');
      const fromMoment = moment(moments[0]);
      const toMoment = moment(moments[1]);
      const avgTime = `${moment(fromMoment).format('MM/DD hh')}~\n${moment(toMoment).format('MM/DD hh')}`;
      return avgTime;
    }) : [],
    xAxis: rawResult.xAxisForSourceAmountTrend,
  };
  console.log(sourceAmountTrend);
  return sourceAmountTrend;
};

export default getSourceAmountTrend;
