import { Component, Input, OnInit } from "@angular/core";
import { customChartSettings } from "src/app/graphs/item-detail";
import * as Highcharts from "highcharts";
import { ItemsApiService } from "src/app/items-api.service";
import { AnalyzeChartService } from "../../analyze-chart.service";
import { ItemChartService } from "src/app/_services/item-chart.service";
import { ChartLine } from "../../_services/chart-service-utils";
import { Metrics } from "../metrics";

@Component({
  selector: "app-analyze-charts",
  templateUrl: "./analyze-charts.component.html",
  styleUrls: ["./analyze-charts.component.css", "../item-detail.component.scss"]
})

export class AnalyzeChartsComponent implements OnInit {

  @Input() params: { projectName: string, scenarioName: string, id: string };
  @Input() chartLines: ChartLine;
  @Input() isAnonymous: boolean;
  @Input() showPerformanceAnalysisLines;
  Highcharts: typeof Highcharts = Highcharts;
  customChartsOptions = {
    ...customChartSettings(), series: []
  };
  updateLabelChartFlag = false;
  labels: string[];
  yAxisId = new Map([
    [Metrics.Throughput, 0],
    ["Response Time", 1],
    [Metrics.Threads, 2],
    [Metrics.ErrorRate, 3],
    [Metrics.Network, 4]
  ]);
  preloadedSeries;
  isTemporaryChart = false;

  constructor(
    private itemApiService: ItemsApiService,
    private analyzeChartService: AnalyzeChartService,
    private itemChartService: ItemChartService
  ) {
  }

  ngOnInit() {
    // this needs to be initialized for both anonymous and logged-in user
    this.analyzeChartService.currentData.subscribe(data => {
      let chartLines;
      if (data) {
        const { label, metrics } = data;
        this.isTemporaryChart = true;
        if (metrics && metrics.length > 0) {
          chartLines = metrics.map(_ => ({ name: label, metric: _ }));
        } else {
          // add all available lines
          const labelLines = [];
          this.chartLines.labels.forEach((value, key) => {
            const labelFound = value.find((_) => _.name === data.label);
            if (labelFound) {
              labelLines.push({ name: data.label, metric: key });
            }
          });
          chartLines = labelLines;
        }
        this.updateChart(chartLines);
      }
    });

    // exit onInit if user is anonymous, the code that's after is only for valid for logged-in user
    if (this.isAnonymous) {
      return;
    }

    this.itemApiService
      .fetchItemChartSettings(this.params.projectName, this.params.scenarioName, this.params.id)
      .subscribe(_ => {
        this.updateChart(_);
        this.preloadedSeries = _;
      });


  }


  chartUpdated(event: [{ name: string, metric: string }]) {
    this.updateChart(event);
    this.saveChartSettings(event);
  }

  chartCallback: Highcharts.ChartCallbackFunction = function (chart): void {
    setTimeout(() => {
      chart.reflow();
    }, 0);
  };

  private updateChart(series) {
    const chartSeries: Line[] = [];
    if (!Array.isArray(series)) {
      return;
    }
    series.forEach(_ => {
      const { name, metric } = _;
      const yAxis = this.yAxisId.get(metric.includes("Response Time") ? "Response Time" : metric);
      if (name === "overall") {
        const metricLine = this.chartLines.overall.get(metric);
        const line: Line = {
          ...metricLine,
          id: `${metric}: ${name}`,
          metric,
          yAxis
        };
        chartSeries.push(line);
      } else {
        const labelMetric = this.chartLines.labels.get(metric)
          .find(__ => __.name === name);
        const line: Line = {
          name: `${metric}: ${name}`,
          data: labelMetric.data,
          id: `${metric}: ${name}`,
          metric,
          label: name,
          tooltip: {
            valueSuffix: labelMetric.suffix
          },
          yAxis
        };
        chartSeries.push(line);
      }
    });
    // hide all axis
    this.customChartsOptions.yAxis.forEach(axis => axis.visible = false);
    // display only actual axis
    chartSeries.forEach(series => {
      this.customChartsOptions.yAxis[series.yAxis].visible = true;
    });
    this.customChartsOptions.series = JSON.parse(JSON.stringify(chartSeries));
    this.updateLabelChartFlag = true;
  }

  loadSavedCustomChart() {
    this.isTemporaryChart = false;
    this.updateChart(this.preloadedSeries);
  }

  private saveChartSettings(event) {
    if (this.isAnonymous) {
      return;
    }
    this.preloadedSeries = event;
    this.itemApiService.upsertItemChartSettings(
      this.params.projectName,
      this.params.scenarioName,
      this.params.id, event).subscribe(_ => _);
  }
}

interface Line {
  data: [];
  name: string;
  yAxis: number;
  id: number | string;
  tooltip?: {
    valueSuffix: string
  }
  metric?,
  label?: string,
}

