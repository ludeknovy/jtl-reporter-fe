export const commonGraphSettings: any = (text) => {
  return {
    chart: {
      type: 'line',
      zoomType: 'x',
      marginTop: 50,
      className: 'chart-sync',
    },
    time: {
      getTimezoneOffset: function (timestamp) {
        const d = new Date();
        const timezoneOffset = d.getTimezoneOffset();
        return timezoneOffset;
      }
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: false
        },
      }
    },
    title: {
      text: ''
    },
    colors: ['#5DADE2', '#2ECC71', '#F4D03F', '#D98880',
      '#707B7C', '#7DCEA0', '#21618C', '#873600', '#AF7AC5', '#B7950B'],
    tooltip: {
      split: true,
      crosshairs: [true]
    },
    plotOptions: {
      series: {
        connectNulls: true,
      },
      line: {
        lineWidth: 1.5,
        states: {
          hover: {
            lineWidth: 1.5
          }
        },
        marker: {
          enabled: false
        },
      }
    },
    xAxis: {
      lineWidth: 0,
      type: 'datetime',
      crosshair: true,
    },
    yAxis: [{
      gridLineColor: '#f2f2f2',
      lineWidth: 0,
      title: {
        text
      },
    },
    {
      gridLineColor: '#f2f2f2',
      lineWidth: 0,
      opposite: true,
      title: {
        text: 'virtual users'
      }
    },
    ],
  };
};

export const overallChartSettings = (text) => {
  const commonSettings = commonGraphSettings(text);
  const yAxis = [
    {
      gridLineColor: '#f2f2f2',
      lineWidth: 0,
      title: {
        text: 'hits/s'
      },
    },
    {
      gridLineColor: '#f2f2f2',
      lineWidth: 0,
      opposite: true,
      title: {
        text: '%'
      },
    }];

  yAxis.forEach((axis) => {
    commonSettings.yAxis.push(axis);
  });

  return commonSettings;
};

export const customChartSettings = () => {
 return {
  chart: {
    type: 'line',
    zoomType: 'x',
    marginTop: 50,
    className: 'chart-sync',
  },
  time: {
    getTimezoneOffset: function (timestamp) {
      const d = new Date();
      const timezoneOffset = d.getTimezoneOffset();
      return timezoneOffset;
    }
  },
  exporting: {
    buttons: {
      contextButton: {
        enabled: false
      },
    }
  },
  title: {
    text: ''
  },
  colors: ['#5DADE2', '#2ECC71', '#F4D03F', '#D98880',
    '#707B7C', '#7DCEA0', '#21618C', '#873600', '#AF7AC5', '#B7950B'],
  tooltip: {
    split: true,
    crosshairs: [true]
  },
  plotOptions: {
    series: {
      connectNulls: true,
    },
    line: {
      lineWidth: 1.5,
      states: {
        hover: {
          lineWidth: 1.5
        }
      },
      marker: {
        enabled: false
      },
    }
  },
  xAxis: {
    lineWidth: 0,
    type: 'datetime',
    crosshair: true,
  },
  yAxis: [{
    gridLineColor: '#f2f2f2',
    lineWidth: 0,
    title: {
      text: 'hits/s'
    },
  },
  {
    gridLineColor: '#f2f2f2',
    lineWidth: 0,
    title: {
      text: 'ms'
    },
  },
  {
    gridLineColor: '#f2f2f2',
    lineWidth: 0,
    title: {
      text: 'VU'
    },
  },
  {
    gridLineColor: '#f2f2f2',
    lineWidth: 0,
    opposite: true,
    title: {
      text: '%'
    },
  },
  {
    gridLineColor: '#f2f2f2',
    lineWidth: 0,
    opposite: true,
    title: {
      text: 'mbps'
    },
  }
],
 };
};


export const threadLineSettings: any = {
  color: '#000000',
  dashStyle: 'shortDot',
  yAxis: 1
};

export const errorLineSettings: any = {
  color: '#e74c3c',
  dashStyle: 'shortDot',
  yAxis: 3
};

export const throughputLineSettings: any = {
  color: '#2ECC71',
  yAxis: 2
};

export const networkLineSettings: any = {
  color: 'grey',
  yAxis: 3,
  visible: false,
  name: 'network'
};

export const responseTimeLineSettings: any = {
};
