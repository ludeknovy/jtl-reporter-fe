export const scenarioHistory = (inputData) => {
  if (inputData.length === 0) {
    return {
      type: "bar",
      data: {
        maxBarNumber: 15,
        labels: [],
        datasets: []
      },
      options
    };
  }
  const dt = inputData.map(_ => {
    return { percentil: _.percentil, date: _.startDate };
  });
  return {
    type: "bar",
    data: {
      maxBarNumber: 15,
      labels: dt.map(_ => _.date),
      datasets: [
        {
          data: dt.map(_ => _.percentil),
          backgroundColor: "rgb(17,122,139, 0.8)",
          fill: true,
          borderWidth: 1,
        }
      ]
    },
    options
  };
};

const options = {
  legend: { display: false },
  scales: {
    xAxes: [{
      display: false,
      gridLines: {
        display: true,
      },
    }],
    yAxes: [{
      stacked: true,
      gridLines: {
        color: "#b7b7b717",
        zeroLineColor: "#b7b7b717",
        drawBorder: false
      }
    }]
  }
};
