import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { bytesToMbps } from 'src/app/calculations';
import { commonGraphSettings, threadLineSettings } from 'src/app/graphs/item-detail';
import { logScaleButton } from 'src/app/graphs/log-scale-button';
import { ItemDataPlot } from 'src/app/items.service.model';

@Component({
  selector: 'app-label-chart',
  templateUrl: './label-chart.component.html',
  styleUrls: ['./label-chart.component.css', '../item-detail.component.scss']
})
export class LabelChartComponent implements OnInit {

  @Input() plot: ItemDataPlot;
  Highcharts: typeof Highcharts = Highcharts;
  HighchartsCompare: typeof Highcharts = Highcharts;
  chartConstructor = 'chart';


  labelChartMetric = 'Throughput';
  labelCompareChartMetric;
  labelChartOptions;
  labelCompareChartOptions;
  updateLabelChartFlag = false;
  chartKeys;
  chartMap = new Map();

  constructor() { }

  ngOnInit() {
    const { responseTime, threads, throughput, network, minResponseTime, maxResponseTime } = this.plot;

    const threadLine = { ...threadLineSettings, name: 'virtual users', data: threads };

    if (network) {
      const networkMbps = network.map((_) => {
        _.data = _.data.map(__ => [__[0], bytesToMbps(__[1])]);
        return _;
      });
      const networkChartOptions = {
        ...commonGraphSettings('mbps'),
        series: [...networkMbps, ...threadLine], ...logScaleButton
      };
      this.chartMap.set('Network', networkChartOptions);
    }

    if (minResponseTime) {
      const minResponseTimeChartOptions = { ...commonGraphSettings('ms'), series: [...minResponseTime, ...threadLine], ...logScaleButton };
      this.chartMap.set('Response Time [min]', minResponseTimeChartOptions);
    }
    if (maxResponseTime) {
      const maxResponseTimeChartOptions = { ...commonGraphSettings('ms'), series: [...maxResponseTime, ...threadLine], ...logScaleButton };
      this.chartMap.set('Response Time [max]', maxResponseTimeChartOptions);
    }

    this.chartMap.set('Response Time [avg]', {
      ...commonGraphSettings('ms'), series: [...responseTime, ...threadLine], ...logScaleButton
    });

    this.chartMap.set('Throughput', { ...commonGraphSettings('hits/s'), series: [...throughput, ...threadLine], ...logScaleButton });

    this.labelChartOptions = JSON.parse(JSON.stringify(this.chartMap.get('Throughput')));
    this.getChartsKey();
  }

  private getChartsKey() {
    this.chartKeys = Array.from(this.chartMap.keys());
  }

  changeChart(event) {
    const target = event.target.innerText;
    this.labelChartMetric = target;
    this.labelChartOptions = this.chartMap.get(target);
    this.updateLabelChartFlag = true;
  }

  changeCompareChart(event) {
    const target = event.target.innerText;
    this.labelCompareChartMetric = target;
    this.labelCompareChartOptions = this.chartMap.get(target);
    this.updateLabelChartFlag = true;
  }

  removeCompareChart() {
    this.labelCompareChartOptions = null;
  }

  addComparisonChart(event) {
    const target = event.target.innerText;
    this.labelCompareChartMetric = target;
    this.labelCompareChartOptions = JSON.parse(JSON.stringify(this.chartMap.get(target)));
  }
}
