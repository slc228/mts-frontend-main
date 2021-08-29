const circleTree = (data, title, size) => ({
  title: {
    text: title,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
    formatter: (params) => {
      const { data } = params.data;
      return `<div style="max-width: 200px; display: inline-block; white-space: pre-wrap">${data?.author || 'root'}\n${data?.content}</div>`;
    },
  },
  series: [
    {
      animation: false,
      label: {
        'normal': {
          'show': true,
          'textStyle': {
            'fontSize': 14 },
        },
        'emphasis': {
          'show': true,
        },
      },
      type: 'tree',
      data: [data],
      top: '18%',
      bottom: '14%',
      layout: 'radial',
      symbol: 'emptyCircle',
      roam: true,
      symbolSize: 7,
      initialTreeDepth: 3,
      expandAndCollapse: false,
      animationDurationUpdate: 750,
      emphasis: {
        focus: 'descendant',
      },
    },
  ],
});

export default circleTree;
