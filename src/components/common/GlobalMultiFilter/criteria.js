const criteria = [
  {
    name: 'sensi',
    label: '敏感度',
    defaultValue: null,
    options: [
      { label: '不限', value: null },
      { label: '敏感', value: '1' },
      { label: '非敏感', value: '0' },
    ],
  },
  {
    name: 'timeOrder',
    label: '时间排序',
    defaultValue: 0,
    options: [
      { label: '时间顺序', value: 0 },
      { label: '时间逆序', value: 1 },
    ],
  },
  {
    name: 'source',
    label: '来源',
    defaultValue: null,
    options: [
      { label: '不限', value: null },
      { label: '网站', value: '1' },
      { label: '论坛', value: '2' },
      { label: '微博', value: '3' },
      { label: '微信', value: '4' },
      { label: '博客', value: '5' },
      { label: '外媒', value: '6' },
      { label: '新闻', value: '7' },
    ],
  },
  {
    name: 'dateRange',
    label: '时间范围',
    defaultValue: null,
    options: [
      { label: '不限', value: null },
      { label: '今日', value: 0 },
      { label: '三日', value: 3 },
      { label: '一周', value: 7 },
      { label: '十日', value: 10 },
      { label: '一月', value: 30 },
      { label: '自定义', value: -1 },
    ],
  },

];

export default criteria;
