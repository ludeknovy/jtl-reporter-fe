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
      split: false,
      crosshairs: [true]

    },
    legend: {
      layout: 'vertical',
      align: 'right',
    },
    plotOptions: {
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
      type: 'logarithmic',
      title: {
        text
      },
    }, {
      lineWidth: 0,
      opposite: true,
      title: {
        text: 'threads'
      }
    }
    ],
  };
};

export const fourAxisGraphSettings = (text, text2, text3) => {
  const commonSettings = commonGraphSettings(text);
  commonSettings.yAxis.push({
    lineWidth: 0,
    opposite: true,
    labels: {
      enabled: false
    },
    title: {
      text: text2
    }
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
  yAxis: 2
};

export const throughputLineSettings: any = {
  color: '#2ECC71',
};

export const responseTimeLineSettings: any = {
};
