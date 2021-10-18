const criteria = (resources) => {
  const result = [
    {
      name: 'timeOrder',
      label: '时间排序',
      defaultValue: 0,
      options: [
        { label: '时间逆序', value: 0 },
        { label: '时间顺序', value: 1 },
      ],
    },
    {
      name: 'sensitiveType',
      label: '敏感度',
      defaultValue: null,
      options: [
        { label: '不限', value: null },
        { label: '正常信息', value: '正常信息 ' },
        { label: '敏感', value: '政治敏感 ' },
        { label: '广告营销', value: '广告营销 ' },
        { label: '不实信息', value: '不实信息 ' },
        { label: '人身攻击', value: '人身攻击 ' },
        { label: '低俗信息', value: '低俗信息 ' },
      ],
    },
    {
      name: 'emotion',
      label: '情感',
      defaultValue: null,
      options: [
        { label: '不限', value: null },
        { label: '中立', value: 'neutral' },
        { label: '愤怒', value: 'angry' },
        { label: '恐惧', value: 'fear' },
        { label: '惊讶', value: 'surprise' },
        { label: '悲伤', value: 'sad' },
        { label: '积极', value: 'happy' },
      ],
    },
    {
      name: 'source',
      label: '来源',
      defaultValue: null,
      options: resources,
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
  return result;
};

export default criteria;
