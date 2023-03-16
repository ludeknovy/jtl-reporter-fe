import { Component, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import * as Highcharts from "highcharts";
import { commonGraphSettings, responseTimeDistribution } from "src/app/graphs/item-detail";
import * as deepmerge from "deepmerge";
import { Metrics } from "../metrics";
import { ResponseTimePerLabelDistribution } from "../../items.service.model";
import { ChartLine } from "../../_services/chart-service-utils";
import { ComparisonChartService } from "../../_services/comparison-chart.service";

@Component({
  selector: "app-label-chart",
  templateUrl: "./label-chart.component.html",
  styleUrls: ["./label-chart.component.css", "../item-detail.component.scss"]
})
export class LabelChartComponent implements OnChanges {

  @Input() chartLines: ChartLine;
  @Input() label: string;
  @Input() activated: boolean;
  @Input() histogramData: ResponseTimePerLabelDistribution[];
  @ViewChild("labelChart") componentRef;
  @ViewChild("labelComparisonChart") labelComparisonChartComponentRef

  Highcharts: typeof Highcharts = Highcharts;
  chartMetric = "Response Times";
  labelChartOptions = commonGraphSettings("ms"); // default empty chart for rendering
  comparisonLabelChartOptions = null;
  updateLabelChartFlag = false;
  chartKeys;
  comparisonChartKeys;
  chartShouldExpand = false;
  chart: Highcharts.Chart;
  comparisonChart: Highcharts.Chart;
  chartCallback;
  comparisonChartCallback;
  labelCharts = new Map();
  comparisonLabelCharts = new Map()
  expanded = false;
  chartEnum = LabelChartType
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
    [Metrics.ErrorRate, commonGraphSettings("%")]
  ]);
  LabelChartType: LabelChartType;

  constructor(
    private comparisonChartService: ComparisonChartService
  ) {
    this.chartCallback = chart => {
      this.chart = chart;
    };
    this.comparisonChartCallback = chart => {
      this.comparisonChart = chart;
    };
    this.responseTimeMetricGroup = [
      Metrics.ResponseTimeP90, Metrics.ResponseTimeAvg, Metrics.ResponseTimeMin,
      Metrics.ResponseTimeMax, Metrics.ResponseTimeP95, Metrics.ResponseTimeP99];
  }



  ngOnChanges(changes: SimpleChanges) {

    // chart expanded
    if (!changes.activated?.previousValue && changes.activated?.currentValue) {
      this.setChartAggregation(this.chartLines, LabelChartType.Default);
      this.getChartsKey(LabelChartType.Default);
      this.setHistogramChart(this.histogramData, LabelChartType.Default);
      this.setChart(this.chartMetric, LabelChartType.Default);
      this.expanded = true;

      this.comparisonChartService.histogram$.subscribe(plot => {
        this.setHistogramChart(plot.responseTimePerLabelDistribution, LabelChartType.Comparison);
      })

      this.comparisonChartService.selectedPlot$.subscribe(plot => {
        if (!plot) {
          if (this.comparisonChart) {
            this.comparisonLabelChartOptions = null
            this.comparisonChart = null
          }
        }
        if (!plot?.chartLines) {
          return;
        }
        this.setChartAggregation(plot.chartLines, LabelChartType.Comparison);
        this.getChartsKey(LabelChartType.Comparison);
        this.setChart(this.chartMetric, LabelChartType.Comparison);
      });
    }
    // aggregation changed, we need to refresh the data but only for opened charts
    if (changes.chartLines?.currentValue && this.expanded) {
      this.setChartAggregation(changes.chartLines.currentValue,  LabelChartType.Default);
      this.setChart(this.chartMetric,LabelChartType.Default);
    }
  }

  private setChartAggregation(chartLines, chartType: LabelChartType) {
    const threadLine = chartLines.overall.get(Metrics.Threads);
    const availableMetrics = Array.from(this.chartLines.labels.keys());
    const responseTimesSeries = [];
    availableMetrics.forEach((metric: Metrics) => {
      const labelMetricsData = chartLines.labels.get(metric).find(data => data.name === this.label);
      if (!labelMetricsData) {
        return
      }
      const chartSettings = this.metricChartMap.get(metric);
      if (this.responseTimeMetricGroup.includes(metric)) {
        responseTimesSeries.push({ data: labelMetricsData.data, suffix: labelMetricsData.suffix, name: metric, yAxis: 0, id: metric });
      } else {
        if (chartType === LabelChartType.Default) {
          this.labelCharts.set(metric, {
            ...chartSettings,
            series: [{ data: labelMetricsData.data, suffix: labelMetricsData.suffix, name: metric, id: metric }, threadLine]
          });
        } else {
          this.comparisonLabelCharts.set(metric, {
            ...chartSettings,
            series: [{ data: labelMetricsData.data, suffix: labelMetricsData.suffix, name: metric, id: metric }, threadLine]
          });
        }

      }
    });
    if (chartType === LabelChartType.Default) {
      this.labelCharts.set("Response Times", { ...commonGraphSettings("ms"), series: [...responseTimesSeries, threadLine] });
    } else {
      if (responseTimesSeries.length > 0) {
        this.comparisonLabelCharts.set("Response Times", { ...commonGraphSettings("ms"), series: [...responseTimesSeries, threadLine] });
      }
    }
  }

  private setHistogramChart(histogramData, chartType: LabelChartType) {
    if (chartType === LabelChartType.Default) {
      this.chartKeys.push("Histogram");
      const histogram = histogramData.find(data => data.label === this.label);
      this.labelCharts.set("Histogram", responseTimeDistribution(histogram.values));
    } else {
      const histogram = histogramData.find(data => data.label === this.label);
      this.comparisonLabelCharts.set("Histogram", responseTimeDistribution(histogram.values));
    }
  }


  private getChartsKey(chartType: LabelChartType) {
    if (chartType === LabelChartType.Default) {
      this.chartKeys = Array.from(this.labelCharts.keys());
    }
    else {
      this.comparisonChartKeys = Array.from(this.comparisonLabelCharts.keys());
    }

  }

  changeChartAggregation(event) {
    this.chartMetric = event.target.innerText;
    this.setChart(this.chartMetric, LabelChartType.Comparison)
    this.setChart(this.chartMetric, LabelChartType.Default)
  }


  setChart(metric, chartType: LabelChartType) {
    if (chartType === LabelChartType.Default) {
      if (this.chart) {
        this.chart.destroy();
        this.componentRef.chart = null;
      }
      this.labelChartOptions = deepmerge(this.labelCharts.get(metric), {});
    } else {
      if (this.comparisonChart) {
        this.comparisonChart.destroy();
        this.labelComparisonChartComponentRef.chart = null;
      }
      const chart = this.comparisonLabelCharts.get(metric)
      if (chart) {
        this.comparisonLabelChartOptions = deepmerge(this.comparisonLabelCharts.get(metric), {});
      }

    }
    this.updateLabelChartFlag = true;
  }


  collapseChart() {
    this.chartShouldExpand = !this.chartShouldExpand;
    this.chart.setSize(undefined, this.chartShouldExpand ? 650 : 350);
  }

}


enum LabelChartType {
  Default,
  Comparison

}
