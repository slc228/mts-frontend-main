import Mock from 'mockjs';

const getAmountTrend = (url) => ({
  'timeRange|6': [() => (
    `${Mock.Random.date('yyyy-MM-dd hh:mm:ss')} to ${Mock.Random.date('yyyy-MM-dd hh:mm:ss')}`
  )],
  'totalAmountTrend|6': [() => (Mock.Random.integer(0, 100))],
  'fromTypeAmountTrend1|6': [() => (Mock.Random.integer(0, 20))],
  'fromTypeAmountTrend2|6': [() => (Mock.Random.integer(0, 20))],
  'fromTypeAmountTrend3|6': [() => (Mock.Random.integer(0, 20))],
  'fromTypeAmountTrend4|6': [() => (Mock.Random.integer(0, 20))],
  'fromTypeAmountTrend5|6': [() => (Mock.Random.integer(0, 20))],
  'fromTypeAmountTrend6|6': [() => (Mock.Random.integer(0, 20))],
  'fromTypeAmountTrend7|6': [() => (Mock.Random.integer(0, 20))],
});

export default getAmountTrend;
