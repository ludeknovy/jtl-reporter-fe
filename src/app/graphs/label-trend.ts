export const labelTrendChartOptions = (_) => {
  return {
    chart: {
      type: 'spline',
    },
    title: { text: '' },
    subtitle: {
      text: ''
    },
    xAxis: [{
      lineWidth: 0,
      crosshair: true,
      categories: _.timePoints,
      tickInterval: 5,
      gridLineWidth: 0,
    }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value} ms',
      },
      type: 'logarithmic',
      title: {
        text: '',
      },
      gridLineWidth: 0
    }, {
      title: {
        text: '',
      },
      labels: {
        format: '{value} hit/s',
      },
      type: 'logarithmic',
      gridLineWidth: 0,
      opposite: true
    },
    {
      title: {
        text: '',
      },
      labels: {
        format: '{value} %',
        style: {
          lineWidt: 1,
        },
      },
      gridLineWidth: 0,
      opposite: true
    },
    {
      title: {
        text: '',
      },
      labels: {
        format: '{value} VU',
      },
      type: 'logarithmic',
      gridLineWidth: 0,
      opposite: false,
    }
    ],
    tooltip: {
      shared: true
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.7,
        dataGrouping: { enabled: true }
      },
      // line: {
      //   step: 'center'
      // }
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
    },
    series: [{
      name: '90%',
      type: 'areaspline',
      yAxis: 0,
      stacking: 'normal',
      data: _['n0'],
      // color: colors[0],
      color: '#FFC400',
      lineWidth: 0,
      tooltip: {
        valueSuffix: ' ms'
      },
      marker: { enabled: false },
    },
    {
      name: '95%',
      type: 'areaspline',
      yAxis: 0,
      // color: colors[3],
      color: '#36B37E',
      lineWidth: 0,
      data: _['n5'],
      tooltip: {
        valueSuffix: ' ms'
      },
      marker: { enabled: false },
      stacking: 'normal',
    },
    {
      name: '99%',
      type: 'areaspline',
      yAxis: 0,
      // color: colors[4],
      color: '#008DA6',
      lineWidth: 0,
      data: _['n9'],
      tooltip: {
        valueSuffix: ' ms'
      },
      marker: { enabled: false },
      stacking: 'normal',
    },
    {
      name: 'throughput',
      type: 'spline',
      data: _.throughput,
      visible: false,
      color: '#CB59E8',
      tooltip: {
        valueSuffix: ' hits/s'
      },
      yAxis: 1,
      marker: { enabled: false, symbol: 'circle' }
    },
    {
      name: 'error rate',
      type: 'spline',
      data: _.errorRate,
      tooltip: {
        valueSuffix: ' %'
      },
      color: 'red',
      yAxis: 2,
      dashStyle: 'ShortDot',
      marker: { enabled: false, symbol: 'circle' }
    },
    {
      name: 'threads',
      type: 'spline',
      steped: `center`,
      data: _.threads,
      tooltip: {
        valueSuffix: ' VU'
      },
      color: 'black',
      dashStyle: 'ShortDot',
      yAxis: 3,
      marker: { enabled: false, symbol: 'circle' }
    },
    ]
  };
};

export const emptyChart = () => {
  return {
    chart: {
      type: 'spline'
    },
    title: { text: 'No data' },
    subtitle: {
      text: 'there must be at least 2 records for given label'
    },
  };
};
