export const customScenarioTrends = () => {
  return {
    chart: {
      type: "column",
      zoomType: "x",
      marginTop: 30,
      className: "chart-sync",
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
      text: ""
    },
    colors: ["#5DADE2", "#2ECC71", "#F4D03F", "#D98880",
      "#707B7C", "#7DCEA0", "#21618C", "#873600", "#AF7AC5", "#B7950B"],
    tooltip: {
      split: false,
      crosshairs: [true],
      shared: true,
      valueDecimals: 2,
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        pointWidth: 20,
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
      min: 0,
      max: 15,
      lineWidth: 0,
      type: "datetime",
      crosshair: {
        snap: true
      },
      labels: {
        enabled: false
      }
    },
    yAxis: [
      {
        gridLineColor: "#f2f2f2",
        lineWidth: 0,
        showEmpty: false,
        title: {
          text: "ms"
        },
      },
      {
        gridLineColor: "#f2f2f2",
        lineWidth: 0,
        opposite: true,
        showEmpty: false,
        title: {
          text: "VU"
        },
      },
      {
        gridLineColor: "#f2f2f2",
        lineWidth: 0,
        showEmpty: false,
        title: {
          text: "reqs/s"
        },
      },
      {
        gridLineColor: "#f2f2f2",
        lineWidth: 0,
        opposite: true,
        showEmpty: false,
        title: {
          text: "%"
        },
      },
      {
        gridLineColor: "#f2f2f2",
        lineWidth: 0,
        opposite: true,
        showEmpty: false,
        title: {
          text: "mbps"
        },
      }
    ],
  };
};

export const labelTrends: any = (text, title = "") => {
  return {
    chart: {
      type: "line",
      zoomType: "x",
      marginTop: 50,
      className: "chart-sync",
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
      },
    },
    title: {
      text: title,
    },
    colors: ["#5DADE2", "#2ECC71", "#F4D03F", "#D98880",
      "#707B7C", "#7DCEA0", "#21618C", "#873600", "#AF7AC5", "#B7950B"],
    tooltip: {
      split: true,
      crosshairs: [true],
      valueSuffix: ` ${text}`,
      valueDecimals: 2,
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
      type: "category",
      uniqueNames: true,
      crosshair: {
        snap: true
      },
      labels: {
        enabled: false
      }
    },
    yAxis: [{
      gridLineColor: "#f2f2f2",
      lineWidth: 0,
      title: {
        text
      },
    },
    ],
  };
};

export const responseTimeDegradationCurveOption = () => {
  return {
    chart: {
      type: "line",
      zoomType: "x",
      marginTop: 50,
      className: "chart-sync",
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: false
        },
      },
    },
    title: {
      text: "",
    },
    colors: ["#5DADE2", "#2ECC71", "#F4D03F", "#D98880",
      "#707B7C", "#7DCEA0", "#21618C", "#873600", "#AF7AC5", "#B7950B"],
    tooltip: {
      split: true,
      crosshairs: [true],
      valueSuffix: ` ms`,
      valueDecimals: 2,
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
      type: "category",
      uniqueNames: true,
      crosshair: {
        snap: true
      },
      labels: {
        enabled: true
      },
      title: {
        text: "Virtual Users"
      }
    },
    yAxis: [{
      gridLineColor: "#f2f2f2",
      lineWidth: 0,
      title: {
        text: "ms"
      },
    },
    ],
  };
}
