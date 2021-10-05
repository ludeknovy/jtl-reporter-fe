import { StatusCodes } from '../item-detail/request-stats/status-code-distribution/status-code-distribution.component';
import { colors } from './colors';

export const statusCodesChart = (data: StatusCodes[]) => {
  return {
    exporting: {
      enabled: false,
    },
    colorAxis: {
      minColor: '#FFFFFF',
      maxColor: '#FFF'
  },
    series: [{
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      allowDrillToNode: false,
      animationLimit: 1000,
      dataLabels: {
        enabled: false
      },
      levelIsConstant: true,
      levels: [{
        level: 1,
        dataLabels: {
          enabled: true
        },
        borderWidth: 3
      }],
      data: data.map((_, index) => ({
        name: _.statusCode.toString(),
        value: _.count,
        color: colors[index]
      }))
    }],
    subtitle: {
      text: ''
    },
    title: {
      text: ''
    }
  };
};

