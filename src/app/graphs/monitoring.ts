export const monitoringGraphSettings: any = () => {
  return {
    chart: {
      type: "line",
    },
    time: {
      getTimezoneOffset: function (timestamp) {
        const d = new Date();
        const timezoneOffset = d.getTimezoneOffset();
        return timezoneOffset;
      }
    },
    title: {
      text: ""
    },
    colors: ["#5DADE2", "#2ECC71", "#F4D03F", "#D98880",
      "#707B7C", "#7DCEA0", "#21618C", "#873600", "#AF7AC5", "#B7950B"],
    tooltip: {
      split: false,
      crosshairs: [true],
      valueDecimals: 2,
    },
    plotOptions: {
      line: {
        step: true,
        lineWidth: 1.7,
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
      type: "datetime"
    },
    yAxis: [{
      gridLineWidth: 0.5,
      lineWidth: 0,
      title: {
        text: "%"
      }
    }, {
      lineWidth: 0,
      opposite: true,
      title: {
        text: ""
      }
    }],
  };
};
