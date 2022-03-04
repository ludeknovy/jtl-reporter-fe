export const labelTrendChartOptions = (data) => {
  return {
    chart: {
      type: "column",
      marginTop: 50,
    },
    title: { text: "" },
    subtitle: {
      text: ""
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: true,
        },
      }
    },
    xAxis: [{
      lineWidth: 0,
      crosshair: true,
      categories: data.timePoints,
      tickInterval: 5,
      gridLineWidth: 0,
    }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: "{value} ms",
      },
      type: "logarithmic",
      title: {
        text: "",
      },
      gridLineWidth: 0
    }, {
      title: {
        text: "",
      },
      labels: {
        format: "{value} hit/s",
      },
      type: "logarithmic",
      gridLineWidth: 0,
      opposite: true
    },
    {
      title: {
        text: "",
      },
      labels: {
        format: "{value} %",
        style: {
          lineWidth: 1,
        },
      },
      gridLineWidth: 0,
      opposite: true
    },
    {
      title: {
        text: "",
      },
      labels: {
        format: "{value} VU",
      },
      type: "logarithmic",
      gridLineWidth: 0,
      opposite: false,
    }
    ],
    tooltip: {
      shared: true,
      valueDecimals: 2,
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.9,
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
    },
    series: [
    {
      name: "99%",
      yAxis: 0,
      color: "#008DA6",
      lineWidth: 0,
      data: data["n9"],
      tooltip: {
        valueSuffix: " ms"
      },
      marker: { enabled: false },
    },
    {
      name: "95%",
      yAxis: 0,
      color: "#36B37E",
      lineWidth: 0,
      data: data["n5"],
      tooltip: {
        valueSuffix: " ms"
      },
      marker: { enabled: false },
    },
    {
      name: "90%",
      yAxis: 0,
      data: data["n0"],
      color: "#FFC400",
      lineWidth: 0,
      tooltip: {
        valueSuffix: " ms"
      },
      marker: { enabled: false },
    },
    {
      name: "Connection [avg]",
      yAxis: 0,
      visible: false,
      data: data.connect,
      lineWidth: 0,
      tooltip: {
        valueSuffix: " ms"
      },
      marker: { enabled: false },
    },
    {
      name: "Latency [avg]",
      yAxis: 0,
      visible: false,
      data: data.latency,
      lineWidth: 0,
      tooltip: {
        valueSuffix: " ms"
      },
      marker: { enabled: false },
    },
    {
      name: "Throughput",
      data: data.throughput,
      visible: false,
      color: "#CB59E8",
      tooltip: {
        valueSuffix: " hits/s"
      },
      yAxis: 1,
      marker: { enabled: false, symbol: "circle" }
    },
    {
      name: "Error Rate",
      data: data.errorRate,
      tooltip: {
        valueSuffix: " %"
      },
      color: "red",
      yAxis: 2,
      marker: { enabled: false, symbol: "circle" }
    },
    {
      name: "Virtual Users",
      type: "spline",
      data: data.threads,
      tooltip: {
        valueSuffix: " VU"
      },
      color: "grey",
      pointRadius: 5,
      pointStyle: "line",
      yAxis: 3,
      marker: { enabled: false, symbol: "circle" }
    },
    ]
  };
};

export const emptyChart = () => {
  return {
    chart: {
      type: "column"
    },
    title: { text: "No data" },
    subtitle: {
      text: "there must be at least 2 records for given label"
    },
  };
};
