const connGraph = (data, title, size) => ({
  title: {
    text: title,
    left: 'center',
    top: '5%',
  },
  tooltip: {
    trigger: 'item',
    formatter: (params) => {
      const { data } = params.data;
      return '<div style="max-width: 200px; display: inline-block; white-space: pre-wrap">' +
        // `<div>事件${data?.clusterNum}:</div>` +
        `<div>时间${data?.time}</div>` +
      // `<div style="max-height: 150px; overflow: hidden; text-overflow: ellipsis">${data?.summary}</div>` +
      '</div>';
    },
    triggerOn: 'mousemove',
  },
  series: [
    {
      type: 'tree',
      data: [data],
      roam: true,
      left: '10%',
      right: '10%',
      symbol: 'circle',
      symbolSize: 30,
      label: {
        position: 'right',
        left: '50%',
        verticalAlign: 'middle',
        align: 'left',
        fontSize: 16,
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

export default connGraph;
