import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { commonGraphSettings, threadLineSettings } from 'src/app/graphs/item-detail';

@Component({
  selector: 'app-label-chart',
  templateUrl: './label-chart.component.html',
  styleUrls: ['./label-chart.component.css', '../item-detail.component.scss']
})
export class LabelChartComponent implements OnInit {

  @Input() labels: Map<string, object>;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'chart';
  labelChartMetric = 'Throughput';
  labelCompareChartMetric;
  labelChartOptions = commonGraphSettings('hits/s');
  updateLabelChartFlag = false;
  chartKeys;
  seriesVisibilityToggle = true;
  seriesVisibilityToggleText = 'Hide all';
  chartShouldExpand = false;
  chart;

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
    this.labelChartOptions = JSON.parse(JSON.stringify(this.labels.get(target)));
    this.updateLabelChartFlag = true;
  }

  toggleSeriesVisibility() {
    this.labelChartOptions.series.map(_ => _.visible = !this.seriesVisibilityToggle);
    this.seriesVisibilityToggleText = this.seriesVisibilityToggle ? 'Show all' : 'Hide all';
    this.seriesVisibilityToggle = !this.seriesVisibilityToggle;
    this.updateLabelChartFlag = true;
  }

  collapseChart() {
    this.chartShouldExpand = !this.chartShouldExpand;
    this.chart.setSize(undefined, this.chartShouldExpand ? 650 : 350);
  }


  getInstance(chart): void {
    this.chart = chart;
 }
}
