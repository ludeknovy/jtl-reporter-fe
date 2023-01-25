import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import * as Highcharts from "highcharts";
import { commonGraphSettings } from "src/app/graphs/item-detail";
import * as deepmerge from "deepmerge";
import { ChartLine } from "src/app/_services/item-chart.service";
import { Metrics } from "../metrics";

@Component({
  selector: "app-label-chart",
  templateUrl: "./label-chart.component.html",
  styleUrls: ["./label-chart.component.css", "../item-detail.component.scss"]
})
export class LabelChartComponent implements OnInit, OnChanges {

  @Input() chartLines: ChartLine;
  @Input() label: string;
  @Input() activated: boolean;
  Highcharts: typeof Highcharts = Highcharts;
  chartMetric = "Response Times";
  labelCompareChartMetric;
  labelChartOptions = commonGraphSettings("reqs/s");
  updateLabelChartFlag = false;
  chartKeys;
  chartShouldExpand = false;
  chart: Highcharts.Chart;
  chartCallback;
  labelCharts = new Map();
  expanded = false
  private responseTimeMetricGroup: string[];

  metricChartMap = new Map([
    [Metrics.Throughput, commonGraphSettings("reqs/s")],
    [Metrics.Network, commonGraphSettings("mbps")],
    [Metrics.ResponseTimeAvg, commonGraphSettings("ms")],
    [Metrics.ResponseTimeMax, commonGraphSettings("ms")],
    [Metrics.ResponseTimeMin, commonGraphSettings("ms")],
    [Metrics.ResponseTimeP90, commonGraphSettings("ms")],
    [Metrics.ResponseTimeP95, commonGraphSettings("ms")],
    [Metrics.ResponseTimeP99, commonGraphSettings("ms")],
  ]);

  constructor() {
    this.chartCallback = chart => {
      this.chart = chart;
    };
    this.responseTimeMetricGroup = [
      Metrics.ResponseTimeP90, Metrics.ResponseTimeAvg, Metrics.ResponseTimeMin,
      Metrics.ResponseTimeMax, Metrics.ResponseTimeP95, Metrics.ResponseTimeP99];
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {

    // chart expanded
    if (!changes.activated?.previousValue && changes.activated?.currentValue) {
      this.setChartAggregation()
      this.getChartsKey();
      this.changeChart({ target: { innerText: this.chartMetric } });
      this.chart.reflow();
      this.expanded = true
    }
    // aggregation changed, we need to refresh the data but only for opened charts
    if (changes.chartLines?.currentValue && this.expanded) {
      this.chartLines = changes.chartLines.currentValue
      this.setChartAggregation()
      this.changeChart({ target: { innerText: this.chartMetric } });
    }

  }

  private setChartAggregation() {
    const threadLine = this.chartLines.overall.get(Metrics.Threads);
    const availableMetrics = Array.from(this.chartLines.labels.keys());
    const responseTimesSeries = [];
    availableMetrics.forEach((metric: Metrics) => {
      const labelMetricsData = this.chartLines.labels.get(metric).find(data => data.name === this.label);
      const chartSettings = this.metricChartMap.get(metric);
      if (this.responseTimeMetricGroup.includes(metric)) {
        responseTimesSeries.push({ data: labelMetricsData.data, suffix: labelMetricsData.suffix, name: metric, yAxis: 0 });
      } else {
        this.labelCharts.set(metric, { ...chartSettings, series: [labelMetricsData, threadLine] });
      }
    });
    this.labelCharts.set("Response Times", { ...commonGraphSettings("ms"), series: [...responseTimesSeries, threadLine] });
  }


  private getChartsKey() {
    this.chartKeys = Array.from(this.labelCharts.keys());
  }


  changeChart(event) {
    this.chartMetric = event.target.innerText;
    this.labelChartOptions = deepmerge(this.labelCharts.get(this.chartMetric), {});
    this.updateLabelChartFlag = true;
  }


  collapseChart() {
    this.chartShouldExpand = !this.chartShouldExpand;
    this.chart.setSize(undefined, this.chartShouldExpand ? 650 : 350);
  }

}


