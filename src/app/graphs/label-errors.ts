import { colors } from "./colors";

export const emptyResponseCodesChart = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false
  },
  colors,
  title: {
    text: "Response codes",
    align: "center",
    verticalAlign: "middle",
    y: 60
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: "black"
        }
      },
      startAngle: -90,
      endAngle: 90,
      center: ["50%", "75%"],
      size: "110%"
    }
  },
  series: [{
    type: "pie",
    name: "Response codes",
    innerSize: "50%",
  }],
};

