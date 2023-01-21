import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from "highcharts";
import { commonGraphSettings } from "src/app/graphs/item-detail";
import * as deepmerge from "deepmerge";
import { LabelChartLine } from "src/app/_services/item-chart.service";
import { Metrics } from "../metrics";

@Component({
  selector: "app-label-chart",
  templateUrl: "./label-chart.component.html",
  styleUrls: ["./label-chart.component.css", "../item-detail.component.scss"]
})
export class LabelChartComponent implements OnInit, OnChanges {

  @Input() labelLines: Map<Metrics, LabelChartLine[]>;
  @Input() label: string;
  @Input() activated: boolean
  Highcharts: typeof Highcharts = Highcharts;
  labelChartMetric = Metrics.Throughput;
  labelCompareChartMetric;
  labelChartOptions = commonGraphSettings("reqs/s");
  updateLabelChartFlag = false;
  chartKeys;
  chartShouldExpand = false;
  chart;
  chartCallback
  labelCharts = new Map();

  metricChartMap = new Map([
    [Metrics.Throughput, commonGraphSettings("reqs/s")],
    [Metrics.Network, commonGraphSettings("mbps")],
    [Metrics.ResponseTimeAvg, commonGraphSettings("ms")],
    [Metrics.ResponseTimeMax, commonGraphSettings("ms")],
    [Metrics.ResponseTimeMin, commonGraphSettings("ms")],
    [Metrics.ResponseTimeP90, commonGraphSettings("ms")],
    [Metrics.ResponseTimeP95, commonGraphSettings("ms")],
    [Metrics.ResponseTimeP99, commonGraphSettings("ms")],
  ])

  constructor() {
    this.chartCallback = chart => {
      this.chart = chart;
    };
  }

  ngOnInit() {
    const availableMetrics = Array.from(this.labelLines.keys())
    availableMetrics.forEach(metric => {
      const labelMetricsData = this.labelLines.get(Metrics.Throughput).find(data => data.name === this.label);
      const chartSettings = this.metricChartMap.get(metric)
      this.labelCharts.set(metric, { ...chartSettings, series: [labelMetricsData ] })
    })
    this.labelChartOptions = this.labelCharts.get(this.labelChartMetric)
    this.updateLabelChartFlag = true;
    this.getChartsKey();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activated.currentValue) {
      this.chart.reflow()
    }
  }


  private getChartsKey() {
    this.chartKeys = Array.from(this.labelCharts.keys());
  }


  changeChart(event) {
    this.labelChartMetric = event.target.innerText;
    this.labelChartOptions = JSON.parse(JSON.stringify(this.labelCharts.get(this.labelChartMetric)))
    this.updateLabelChartFlag = true;
  }


  collapseChart() {
    this.chartShouldExpand = !this.chartShouldExpand;
    this.chart.setSize(undefined, this.chartShouldExpand ? 650 : 350);
  }

}
