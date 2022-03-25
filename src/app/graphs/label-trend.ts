import { LabelTrend } from "../items.service.model";

export const labelTrendChartOptions = (data: LabelTrend) => {
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
      categories: data.chartSeries.timePoints,
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
        format: "{value} reqs/s",
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
      series: {
        dataLabels: {
            enabled: false
        }
    }
    },
    legend: {
      layout: "horizontal",
      align: "center",
    },
    series: [
    {
      name: "Response Time [P99]",
      visible: data.chartSettings.p99,
      yAxis: 0,
      color: "#008DA6",
      lineWidth: 0,
      data: data.chartSeries.p99,
      tooltip: {
        valueSuffix: " ms"
      },
      marker: { enabled: false },
    },
    {
      name: "Response Time [P95]",
      visible: data.chartSettings.p95,
      yAxis: 0,
      color: "#36B37E",
      lineWidth: 0,
      data: data.chartSeries.p95,
      tooltip: {
        valueSuffix: " ms"
      },
      marker: { enabled: false },
    },
    {
      name: "Response Time [P90]",
      visible: data.chartSettings.p90,
      yAxis: 0,
      data: data.chartSeries.p90,
      color: "#FFC400",
      lineWidth: 0,
      tooltip: {
        valueSuffix: " ms"
      },
      marker: { enabled: false },
    },
    {
      name: "Response Time [avg]",
      yAxis: 0,
      visible: data.chartSettings.avgResponseTime,
      data: data.chartSeries.avgResponseTime,
      lineWidth: 0,
      tooltip: {
        valueSuffix: " ms"
      },
      marker: { enabled: false },
    },
    {
      name: "Connection [avg]",
      yAxis: 0,
      visible: data.chartSettings.avgConnectionTime,
      data: data.chartSeries.avgConnectionTime,
      lineWidth: 0,
      tooltip: {
        valueSuffix: " ms"
      },
      marker: { enabled: false },
    },
    {
      name: "Latency [avg]",
      yAxis: 0,
      visible: data.chartSettings.avgLatency,
      data: data.chartSeries.avgLatency,
      lineWidth: 0,
      tooltip: {
        valueSuffix: " ms"
      },
      marker: { enabled: false },
    },
    {
      name: "Throughput",
      visible: data.chartSettings.throughput,
      data: data.chartSeries.throughput,
      color: "#CB59E8",
      tooltip: {
        valueSuffix: " reqs/s"
      },
      yAxis: 1,
      marker: { enabled: false, symbol: "circle" }
    },
    {
      name: "Error Rate",
      visible: data.chartSettings.errorRate,
      data: data.chartSeries.errorRate,
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
      data: data.chartSeries.virtualUsers,
      visible: data.chartSettings.virtualUsers,
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
