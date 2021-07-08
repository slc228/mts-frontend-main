const chinaMap = (data, title, size) => {
  return ({
    title: {
      text: title,
      left: 'center',
    },
    visualMap: {
      left: '10%',
      min: data.min,
      max: data.max,
      inRange: {
        color: ['#ffffff', '#fdae61', '#f46d43', '#d73027', '#FF0000'],
      },
      text: ['最多舆情', '最少舆情'],
      calculable: true,
    },
    series: [{
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
      name: '舆情数量',
      type: 'map',
      mapType: 'china',
      roam: true,
      top: '3%',
      data: data.regions,
      label: {
        show: true
      },
    }],
  });
};

export default chinaMap;
