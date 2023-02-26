import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Highcharts from "highcharts";
import * as moment from "moment";
import { customScenarioTrends } from "src/app/graphs/scenario-trends";
import { Series } from "src/app/graphs/series.model";
import { bytesToMbps } from "src/app/item-detail/calculations";
import { LabelTrendsData, ScenarioTrendsData, ScenarioTrendsUserSettings } from "src/app/items.service.model";
import { ScenarioService } from "src/app/scenario.service";
import { commonGraphSettings } from "../../graphs/item-detail";

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
    ...commonGraphSettings("ms", "Response Time [P90]"), series: []
  };
  labelScenarioTrendChartThroughputOption = {
    ...commonGraphSettings("req/s", "Throughput"), series: []
  };
  labelScenarioTrendChartErrorRateOption = {
    ...commonGraphSettings("%", "ErrorRate"), series: []
  }
  userSettings: ScenarioTrendsUserSettings;
  chartDataMapping;
  itemIds;
  labelDataTruncated = false

  constructor(private scenarioService: ScenarioService, private router: Router,
  ) {
    this.chartDataMapping = new Map([
      ["percentil", { name: Series.ResponseTimeP90, onLoad: true, color: "rgb(17,122,139, 0.8)", tooltip: { valueSuffix: " ms" } }],
      ["avgResponseTime", { name: Series.ResponseTimeAvg, onLoad: false, tooltip: { valueSuffix: " ms" } }],
      ["avgLatency", { name: Series.LatencyAvg, onLoad: false, tooltip: { valueSuffix: " ms" } }],
      ["avgConnect", { name: Series.ConnetcAvg, onLoad: false, tooltip: { valueSuffix: " ms" } }],
      ["throughput", { name: Series.Throughput, yAxis: 2, onLoad: true, color: "rgb(41,128,187, 0.8)", tooltip: { valueSuffix: " reqs/s" } }],
      ["maxVu", { name: "vu", yAxis: 1, onLoad: true, type: "spline", color: "grey", }],
      ["errorRate", { name: Series.ErrorRate, yAxis: 3, onLoad: true, color: "rgb(231,76,60, 0.8)", tooltip: { valueSuffix: " %" } }],
      ["network", { name: Series.Network, yAxis: 4, onLoad: false, transform: this.networkTransform, tooltip: { valueSuffix: " mbps" } }],
    ]);
  }

  chartCallback: Highcharts.ChartCallbackFunction = function (chart): void {
    setTimeout(() => {
      chart.reflow();
    }, 0);
  };



  ngOnInit() {
    this.scenarioService.trends$.subscribe((_: { aggregatedTrends: ScenarioTrendsData[], labelTrends: LabelTrendsData[], userSettings: ScenarioTrendsUserSettings }) => {
      this.userSettings = _.userSettings
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
      const chartSerieSettings = this.chartDataMapping.get(key);
      if (!chartSerieSettings) {
        continue;
      }
      series.push({
        name: chartSerieSettings.name || key,
        data: chartSerieSettings.transform ? chartSerieSettings.transform(seriesData[key]) : seriesData[key],
        yAxis: chartSerieSettings.yAxis || 0,
        visible: chartSerieSettings.onLoad || false,
        color: chartSerieSettings.color,
        type: chartSerieSettings.type,
        tooltip: chartSerieSettings.tooltip,
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
    const seriesErrorRate = []
    const seriesThroughput = []

    for (const key of Object.keys(data)) {
      if (seriesP90.length < 20) {
        seriesP90.push({ name: key, data: data[key].percentile90.map(dataValue => [moment(dataValue[0]).valueOf(), dataValue[1]]) });
        seriesErrorRate.push({ name: key, data: data[key].errorRate.map(dataValue => [moment(dataValue[0]).valueOf(), dataValue[1]]) });
        seriesThroughput.push({ name: key, data: data[key].throughput.map(dataValue => [moment(dataValue[0]).valueOf(), dataValue[1]]) });
      } else {
        this.labelDataTruncated = true
        break
      }


    }
    this.labelScenarioTrendChartP90Option.series = JSON.parse(JSON.stringify(seriesP90));
    this.labelScenarioTrendChartThroughputOption.series = JSON.parse(JSON.stringify(seriesThroughput))
    this.labelScenarioTrendChartErrorRateOption.series = JSON.parse(JSON.stringify(seriesErrorRate))
    this.updateLabelScenarioTrendsChartFlag = true;
  }

  onPointSelect(event) {
    if (event && event.point && event.point) {
      const itemId = this.itemIds[event.point.index];
      const { projectName, scenarioName } = this.params;
      this.router.navigate([`./project/${projectName}/scenario/${scenarioName}/item/${itemId}`]);
    }
  }

  private networkTransform = (data) => {
    const network = data.map(_ => bytesToMbps(_));
    return network;
  };

}
