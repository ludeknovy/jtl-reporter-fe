
export const statusCodesChart = (points) => {
  return {
    exporting: {
      enabled: false,
    },
    series: [{
      type: 'treemap',
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
      data: points
    }],
    subtitle: {
      text: ''
    },
    title: {
      text: ''
    }
  };
};

