import qs from 'qs';
import moment from 'moment';
import requests from '../../requests';

const getProgrammeSourceTrend = async (fid, startPublishedDay, endPublishedDay) => {
  const url = encodeURI(`${requests.getProgrammeSourceTrend.url}?fid=${fid}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getProgrammeSourceTrend.method });
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
  return sourceAmountTrend;
};

export default getProgrammeSourceTrend;
