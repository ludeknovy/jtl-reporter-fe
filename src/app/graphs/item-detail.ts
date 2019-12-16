export const commonGraphSettings: any = (text) => {
  return {
    chart: {
      type: 'line',
      zoomType: 'x',
      spacingRight: -7,
      spacingLeft: -7,
      className: 'chart-sync'
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
      lineWidth: 0,
      title: {
        text
      },
    },
    {
      lineWidth: 0,
      opposite: true,
      title: {
        text: 'threads'
      }
    },
    ],
  };
};

export const overallChartSettings = (text) => {
  const commonSettings = commonGraphSettings(text);
  const yAxis = [
  {
    lineWidth: 0,
    title: {
      text: 'hits/s'
    },
  },
  {
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

export const responseTimeLineSettings: any = {
};
