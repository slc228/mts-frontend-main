const criteria = () => {
  const result = [
    {
      name: 'videoTimeOrder',
      label: '时间排序',
      defaultValue: 0,
      options: [
        { label: '时间逆序', value: 0 },
        { label: '时间顺序', value: 1 },
      ],
    },
    {
      name: 'videoSource',
      label: '来源',
      defaultValue: null,
      options: [
        { label: '不限', value: null },
        { label: '抖音', value: 0 },
        { label: '快手', value: 1 },
        { label: '西瓜', value: 2 },
        { label: '优酷', value: 3 },
        { label: '腾讯', value: 4 },
        { label: 'B站', value: 5 },
      ],
    },
    {
      name: 'videoDateRange',
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
  return result;
};

export default criteria;
