
const options = ({ data, projectId, scenarioId }, yUnit) => {
  return {
    hover: {
      intersect: true,
      onHover: function (event, elements) {
        event.target.style.cursor = elements[0] ? "pointer" : "default";
      }
    },
    legend: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (t, d) {
          if (t.datasetIndex === 0) {
            return `${t.yLabel} ${yUnit}`;
          } else if (t.datasetIndex === 1) {
            return `${t.yLabel} VU`;
          }
        }
      }
    },
    scales: {
      xAxes: [{
        display: false,
        gridLines: {
          drawBorder: false,
          display: false,
          type: "time"
        },
      }],
      yAxes: [
        {
          type: "linear",
          position: "left",
          id: "A",
          gridLines: {
            color: "#b7b7b717",
            zeroLineColor: "#b7b7b717",
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: yUnit,
            padding: -3,
            fontColor: "#888888c7"
          },
          ticks: {
            beginAtZero: true,
            min: 0
          }
        },
        {
          id: "B",
          type: "linear",
          position: "right",
          gridLines: {
            color: "#FFFFFF",
            zeroLineColor: "#FFFFFF",
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            display: false
          },
          scaleLabel: {
            display: false,
            labelString: "threads",
            padding: -3,
            fontColor: "#888888c7"
          },
        }
      ]
    },
    onClick: function (e) {
      const element = this.getElementAtEvent(e);
      if (element.length) {
        const index = element[0]._index;
        const itemId = data[index].id;
        window.location.href = `/project/${projectId}/scenario/${scenarioId}/item/${itemId}`;
      }
    }
  };
};

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
