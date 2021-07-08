const doughnutPie = (data, title, size) => ({
  title: {
    text: title,
    left: 'center',
  },
  tooltip: { trigger: 'item' },
  legend: {
    orient: 'vertical',
    left: size === 'big' ? '25%' : '0%',
    top: size === 'big' ? '25%' : '0%',
    data: data.map((item) => item.label),
    textStyle: {
      'fontSize': size === 'big' ? 16 : 14,
    },
  },
  series: [{
    type: 'pie',
    radius: ['40%', '50%'],
    avoidLabelOverlap: false,
    labelLine: { show: false },
    data,
    label: {
      'normal': {
        'show': true,
        'textStyle': {
          'fontSize': 16 },
      },
      'emphasis': {
        'show': true,
      },
    },
  }],
});

export default doughnutPie;
