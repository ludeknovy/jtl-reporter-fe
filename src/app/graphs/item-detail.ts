const EXPORTING_SOURCE_WIDTH = 1920
const EXPORTING_SOURCE_HEIGHT = 500

export const commonGraphSettings: any = (text) => {
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
      sourceWidth: EXPORTING_SOURCE_WIDTH,
      sourceHeight: EXPORTING_SOURCE_HEIGHT,
      buttons: {
        contextButton: {
          enabled: true
        },
      },
    },
    title: {
      text: ""
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
      type: "datetime",
      crosshair: true,
    },
    yAxis: [{
      gridLineColor: "#f2f2f2",
      lineWidth: 0,
      title: {
        text
      },
    },
    {
      gridLineColor: "#f2f2f2",
      lineWidth: 0,
      opposite: true,
      title: {
        text: "virtual users"
      }
    },
    ],
  };
};

export const overallChartSettings = (text) => {
  const commonSettings = commonGraphSettings(text);
  const yAxis = [
    {
      gridLineColor: "#f2f2f2",
      lineWidth: 0,
      title: {
        text: "reqs/s"
      },
    },
    {
      gridLineColor: "#f2f2f2",
      lineWidth: 0,
      opposite: true,
      title: {
        text: "%"
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
    sourceWidth: EXPORTING_SOURCE_WIDTH,
    sourceHeight: EXPORTING_SOURCE_HEIGHT,
    buttons: {
      contextButton: {
        enabled: true,
      },
    }
  },
  title: {
    text: ""
  },
  colors: ["#5DADE2", "#2ECC71", "#F4D03F", "#D98880",
    "#707B7C", "#7DCEA0", "#21618C", "#873600", "#AF7AC5", "#B7950B"],
  tooltip: {
    split: true,
    crosshairs: [true],
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
    type: "datetime",
    crosshair: true,
  },
  yAxis: [{
    visible: false,
    gridLineColor: "#f2f2f2",
    lineWidth: 0,
    title: {
      text: "reqs/s"
    },
  },
  {
    visible: false,
    gridLineColor: "#f2f2f2",
    lineWidth: 0,
    title: {
      text: "ms"
    },
  },
  {
    visible: false,
    gridLineColor: "#f2f2f2",
    lineWidth: 0,
    opposite: true,
    title: {
      text: "VU"
    },
  },
  {
    visible: false,
    gridLineColor: "#f2f2f2",
    lineWidth: 0,
    opposite: true,
    title: {
      text: "%"
    },
  },
  {
    visible: false,
    gridLineColor: "#f2f2f2",
    lineWidth: 0,
    opposite: true,
    title: {
      text: "mbps"
    },
  }
],
 };
};

export const responseTimeDistribution = (data) => {
  return {
    chart: {
      type: "column"
    },
    title: {
      text: ""
    },
    subtitle: {
      text: ""
    },
    legend:{ enabled:false },
    xAxis: {
      crosshair: true,
      type: "category",
      min: 0,
      categories: data.map((value, index) => index * 100)
    },
    yAxis: {
      min: 0,
      title: {
        text: ""
      }
    },
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: "",
      valueDecimals: 0,
      formatter: function () {
        return `${this.y} responses were between ${this.x} and ${this.x + 100} ms`;
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0,
        shadow: false
      }
    },
    series: [{
      data,
      type: "column",
      id: "histogram",
      name: "Response times"
    }]
  }
}


export const threadLineSettings: any = {
  color: "grey",
  yAxis: 1
};

export const errorLineSettings: any = {
  color: "#e74c3c",
  yAxis: 3
};

export const throughputLineSettings: any = {
  color: "#2ECC71",
  yAxis: 2
};

export const networkLineSettings: any = {
  color: "grey",
  yAxis: 3,
  name: "network"
};

export const responseTimeLineSettings: any = {
};
