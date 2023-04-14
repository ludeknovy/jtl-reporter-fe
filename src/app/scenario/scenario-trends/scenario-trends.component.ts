import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Highcharts from "highcharts";
import * as moment from "moment";
import { customScenarioTrends, labelTrends } from "src/app/graphs/scenario-trends";
import { bytesToMbps } from "src/app/item-detail/calculations";
import { LabelTrendsData, ScenarioTrendsData, ScenarioTrendsUserSettings } from "src/app/items.service.model";
import { ScenarioService } from "src/app/scenario.service";
import { Metrics } from "../../item-detail/metrics";

@Component({
  selector: "app-scenario-trends",
  templateUrl: "./scenario-trends.component.html",
  styleUrls: ["./scenario-trends.component.scss"]
})
export class ScenarioTrendsComponent implements OnInit {
  @Input() params;
  Highcharts: typeof Highcharts = Highcharts;
  updateAggregatedScenarioTrendsChartFlag = false;
  updateLabelScenarioTrendsChartFlag = false;
  aggregatedScenarioTrendChartOption = {
    ...customScenarioTrends(), series: []
  };
  labelScenarioTrendChartP90Option = {
    ...labelTrends("ms", "Response Time [P90]"), series: []
  };
  labelScenarioTrendChartThroughputOption = {
    ...labelTrends("req/s", "Throughput"), series: []
  };
  labelScenarioTrendChartErrorRateOption = {
    ...labelTrends("%", "ErrorRate"), series: []
  };
  userSettings: ScenarioTrendsUserSettings;
  chartDataMapping;
  itemIds = new Set();
  labelDataTruncated = false;

  constructor(private scenarioService: ScenarioService, private router: Router,
  ) {
    this.chartDataMapping = new Map([
      ["percentil", { name: Metrics.ResponseTimeP90, onLoad: true, color: "rgb(17,122,139, 0.8)", tooltip: { valueSuffix: " ms" } }],
      ["avgResponseTime", { name: Metrics.ResponseTimeAvg, onLoad: false, tooltip: { valueSuffix: " ms" } }],
      ["avgLatency", { name: Metrics.LatencyAvg, onLoad: false, tooltip: { valueSuffix: " ms" } }],
      ["avgConnect", { name: Metrics.ConnectAvg, onLoad: false, tooltip: { valueSuffix: " ms" } }],
      ["throughput", { name: Metrics.Throughput, yAxis: 2, onLoad: true, color: "rgb(41,128,187, 0.8)", tooltip: { valueSuffix: " reqs/s" } }],
      ["maxVu", { name: Metrics.Threads, yAxis: 1, onLoad: true, type: "spline", color: "grey", }],
      ["errorRate", { name: Metrics.ErrorRate, yAxis: 3, onLoad: true, color: "rgb(231,76,60, 0.8)", tooltip: { valueSuffix: " %" } }],
      ["network", { name: Metrics.Network, yAxis: 4, onLoad: false, transform: this.networkTransform, tooltip: { valueSuffix: " mbps" } }],
    ]);
  }

  chartCallback: Highcharts.ChartCallbackFunction = function (chart): void {
    setTimeout(() => {
      chart.reflow();
    }, 0);
  };


  ngOnInit() {
    this.scenarioService.trends$.subscribe((_: {
      aggregatedTrends: ScenarioTrendsData[],
      labelTrends: LabelTrendsData[],
      userSettings: ScenarioTrendsUserSettings
    }) => {
      if (!_) {
        return;
      }
      this.userSettings = _.userSettings;
      this.generateAggregateChartLines(_.aggregatedTrends);
      this.generateLabelChartLines(_.labelTrends);
    });
  }

  generateAggregateChartLines(data: ScenarioTrendsData[]) {
    if (!Array.isArray(data)) {
      return;
    }
    const dates = data.map(_ => moment(_.overview.startDate).format("DD. MM. YYYY HH:mm:ss"));
    const series = [];
    const seriesData = data.reduce((acc, current) => {
      for (const key of Object.keys(current.overview)) {

        if (!["startDate", "endDate", "duration"].includes(key)) {
          if (!acc[key]) {
            acc[key] = [[current.overview[key]]];
          } else {
            acc[key].push([current.overview[key]]);
          }
        }
      }
      return acc;
    }, {});

    for (const key of Object.keys(seriesData)) {
      const chartSeriesSettings = this.chartDataMapping.get(key);
      if (!chartSeriesSettings) {
        continue;
      }
      console.log({ chartSeriesSettings });
      series.push({
        name: chartSeriesSettings.name || key,
        data: chartSeriesSettings.transform ? chartSeriesSettings.transform(seriesData[key]) : seriesData[key],
        yAxis: chartSeriesSettings.yAxis || 0,
        visible: chartSeriesSettings.onLoad || false,
        color: chartSeriesSettings.color,
        type: chartSeriesSettings.type,
        tooltip: chartSeriesSettings.tooltip,
      });
    }
    this.aggregatedScenarioTrendChartOption.series = JSON.parse(JSON.stringify(series));
    this.aggregatedScenarioTrendChartOption.xAxis["categories"] = dates;

    this.updateAggregatedScenarioTrendsChartFlag = true;
  }

  generateLabelChartLines(data: LabelTrendsData[]) {
    if (!data) {
      return;
    }

    const seriesP90 = [];
    const seriesErrorRate = [];
    const seriesThroughput = [];

    for (const key of Object.keys(data)) {
      if (seriesP90.length < 20) {
        data[key].percentile90.forEach(dataValue => this.itemIds.add(dataValue[2]));
        seriesP90.push({ name: key, data: data[key].percentile90.map(dataValue => ({ y: dataValue[1], name: dataValue[0] })) });
        seriesErrorRate.push({ name: key, data: data[key].errorRate.map(dataValue => ({ y: dataValue[1], name: dataValue[0] })) });
        seriesThroughput.push({ name: key, data: data[key].throughput.map(dataValue => ({ y: dataValue[1], name: dataValue[0] })) });
      } else {
        this.labelDataTruncated = true;
        break;
      }


    }
    this.updateLabelChart(this.labelScenarioTrendChartP90Option, seriesP90);
    this.updateLabelChart(this.labelScenarioTrendChartThroughputOption, seriesThroughput);
    this.updateLabelChart(this.labelScenarioTrendChartErrorRateOption, seriesErrorRate);
    this.updateLabelScenarioTrendsChartFlag = true;
  }

  onPointSelect(event) {
    if (event && event.point && event.point) {
      const itemId = Array.from(this.itemIds)[event.point.index];
      const { projectName, scenarioName } = this.params;
      this.router.navigate([`./project/${projectName}/scenario/${scenarioName}/item/${itemId}`]);
    }
  }

  private updateLabelChart(chartOptions, series) {
    chartOptions.series = JSON.parse(JSON.stringify(series));
    chartOptions.xAxis.categories = this.itemIds;
  }

  private networkTransform = (data) => {
    const network = data.map(_ => bytesToMbps(_));
    return network;
  };

}
