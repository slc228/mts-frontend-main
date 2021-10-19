import qs from 'qs';
import moment from 'moment';
import requests from '../../requests';

const getProgrammeTotalAmountTrend = async (fid, startPublishedDay, endPublishedDay) => {
  const url = encodeURI(`${requests.getProgrammeTotalAmountTrend.url}?fid=${fid}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getProgrammeTotalAmountTrend.method });
  const rawResult = response.status === 200 ? await response.json() : {};
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
  return totalAmountTrend;
};

export default getProgrammeTotalAmountTrend;
