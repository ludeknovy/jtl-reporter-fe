import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { bytesToMbps } from 'src/app/item-detail/calculations';
import { commonGraphSettings, threadLineSettings } from 'src/app/graphs/item-detail';
import { logScaleButton } from 'src/app/graphs/log-scale-button';
import { ItemDataPlot } from 'src/app/items.service.model';

@Component({
  selector: 'app-label-chart',
  templateUrl: './label-chart.component.html',
  styleUrls: ['./label-chart.component.css', '../item-detail.component.scss']
})
export class LabelChartComponent implements OnInit {

  @Input() labels: Map<string, object>;
  Highcharts: typeof Highcharts = Highcharts;
  HighchartsCompare: typeof Highcharts = Highcharts;
  chartConstructor = 'chart';


  labelChartMetric = 'Throughput';
  labelCompareChartMetric;
  labelChartOptions;
  labelCompareChartOptions;
  updateLabelChartFlag = false;
  chartKeys;

  constructor() { }

  ngOnInit() {


    this.labelChartOptions = JSON.parse(JSON.stringify(this.labels.get('Throughput')));
    this.getChartsKey();
  }

  private getChartsKey() {
    this.chartKeys = Array.from(this.labels.keys());
  }

  changeChart(event) {
    const target = event.target.innerText;
    this.labelChartMetric = target;
    this.labelChartOptions = this.labels.get(target);
    this.updateLabelChartFlag = true;
  }

  changeCompareChart(event) {
    const target = event.target.innerText;
    this.labelCompareChartMetric = target;
    this.labelCompareChartOptions = this.labels.get(target);
    this.updateLabelChartFlag = true;
  }

  removeCompareChart() {
    this.labelCompareChartOptions = null;
  }

  addComparisonChart(event) {
    const target = event.target.innerText;
    this.labelCompareChartMetric = target;
    this.labelCompareChartOptions = JSON.parse(JSON.stringify(this.labels.get(target)));
  }
}
