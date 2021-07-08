const defaultPie = (data, title, size) => ({
  title: {
    text: title,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: size === 'big' ? 'vertical' : 'horizontal',
    left: size === 'big' ? '25%' : '0%',
    top: size === 'big' ? '25%' : '10%',
    data: data.map((item) => item.label),
    textStyle: {
      'fontSize': size === 'big' ? 16 : 14,
    },
  },
  series: [{
    color: data[0]?.color ? [
      'pink', 'red', 'blue', 'yellow', 'green', 'darkgray'
    ] : undefined,
    type: 'pie',
    radius: '50%',
    data,
    center: size === 'big' ? ['50%', '50%'] : ['50%', '60%'],
    label: {
      'normal': {
        'show': true,
        'textStyle': {
          'fontSize': 16,
        },
      },
      'emphasis': {
        'show': true,
      },
    },
  }],
});

export default defaultPie;
