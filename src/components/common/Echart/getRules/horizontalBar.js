const horizontalBar = (data, title, size) => ({
  title: {
    text: title,
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
  },
  legend: {
    orient: 'horizontal',
    left: size === 'big' ? 'center' : '0%',
    top: size === 'big' ? '5%' : '10%',
    textStyle: {
      'fontSize': size === 'big' ? 16 : 14,
    },
  },
  grid: {
    top: size === 'big' ? '15%' : '25%',
    left: size === 'big' ? '5%' : '0%',
    right: '0%',
    bottom: '0%',
    containLabel: true,
  },
  xAxis: { type: 'value' },
  yAxis: {
    type: 'category',
    data: data.yAxis,
  },
  series: data.xAxis.map((item) => ({
    type: 'bar',
    stack: 'total',
    data: item.value,
    name: item.name,
    color: item.color,
    // label: { show: true },
    barWidth: 20,
    /* label: {
      'normal': {
        'show': true,
        'textStyle': {
          'fontSize': 18 },
      },
      'emphasis': {
        'show': true,
      },
    }, */
  })),
});

export default horizontalBar;
