import { colors } from './colors';

export const responseCodesChart = (data) => {
  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: data.length > 0 ? 'Response codes' : 'no data',
      align: 'center',
      verticalAlign: 'middle',
      y: 60
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        colors: colors,
        dataLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'black'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%'
      }
    },
    series: [{
      type: 'pie',
      name: 'Response codes',
      innerSize: '50%',
      data
    }]
  };
};
