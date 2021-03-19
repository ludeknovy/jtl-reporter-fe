import { Component, Input, OnInit } from '@angular/core';
import { commonGraphSettings, customChartSettings } from 'src/app/graphs/item-detail';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-analyze-charts',
  templateUrl: './analyze-charts.component.html',
  styleUrls: ['./analyze-charts.component.css', '../item-detail.component.scss']
})
export class AnalyzeChartsComponent implements OnInit {

  @Input() chartLines: ChartLines;
  Highcharts: typeof Highcharts = Highcharts;
  customChartsOptions = {
    ...customChartSettings(), series: []
  };
  updateLabelChartFlag = false;
  labels: string[];
  yAxisId = new Map([
    ['Throughput', 0],
    ['Response Time', 1],
    ['Threads', 2],
    ['Error Rate', 3],
    ['Network', 4]
  ]);

  constructor() {
  }

  ngOnInit() {
  }

  chartUpdated(event: [{ name: string, metric: string }]) {
    const chartSeries: Line[] = [];

    event.forEach(_ => {
      const { name, metric } = _;
      const yAxis = this.yAxisId.get(metric.includes('Response Time') ? 'Response Time' : metric);
      if (name === 'overall') {
        const metricLine = this.chartLines.overall.get(metric);
        const line: Line = {
          ...metricLine,
          yAxis
        };
        chartSeries.push(line);
      } else {
        const labelMetric = this.chartLines.labels.get(metric)
          .find((_) => _.name === name);
        const line: Line = {
          name: `${metric}: ${name}`,
          data: labelMetric.data,
          yAxis
        };
        chartSeries.push(line);
      }
    })
    console.log(event)
    console.log(chartSeries)


    this.customChartsOptions.series = chartSeries;
    this.updateLabelChartFlag = true;
  }
}

interface Line {
  data: [];
  name: string;
  yAxis: number;
}

interface ChartLines {
  labels: Map<string, [{ data: [], name: string }]>;
  overall: Map<string, { name: string, data: []}>;
}
