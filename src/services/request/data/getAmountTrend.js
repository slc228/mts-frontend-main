import qs from 'qs';
import moment from 'moment';
import requests from '../../requests';

const getAmountTrend = async (keyword, startPublishedDay, endPublishedDay) => {
  /* const params = {
    keyword,
    startPublishedDay,
    endPublishedDay,
  }; */
  const url = encodeURI(`${requests.getAmountTrend.url}?keyword=${keyword}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getAmountTrend.method });
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
  const totalAmountTrend = {
    xAxis: rawResult.timeRange ? rawResult.timeRange.map((str) => {
      const moments = str.split(' to ');
      const fromMoment = moment(moments[0]);
      const toMoment = moment(moments[1]);
      const avgTime = `${moment(fromMoment).format('MM/DD hh:00')}~\n${moment(toMoment).format('MM/DD hh:00')}`;
      return avgTime;
    }) : [],
    yAxis: rawResult.totalAmountTrend,
  };
  console.log(sourceAmountTrend);
  return [totalAmountTrend, sourceAmountTrend];
};

export default getAmountTrend;
