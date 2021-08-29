const defaultTree = (data, title, size) => ({
  title: {
    text: title,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: (params) => {
      const { data } = params.data;
      return `<div style="max-width: 200px; display: inline-block; white-space: pre-wrap">${data?.author || 'root'}\n${data?.content}</div>`;
    },
    triggerOn: 'mousemove',
  },
  series: [
    {
      animation: false,
      type: 'tree',
      data: [data],
      roam: true,
      left: '10%',
      right: '10%',
      symbolSize: 7,
      label: {
        position: 'left',
        verticalAlign: 'middle',
        align: 'right',
        fontSize: 14,
      },
      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left',
        },
      },
      emphasis: {
        focus: 'descendant',
      },
      initialTreeDepth: [-1],
      expandAndCollapse: false,
      animationDuration: 550,
      animationDurationUpdate: 750,
    },
  ],
});

export default defaultTree;
