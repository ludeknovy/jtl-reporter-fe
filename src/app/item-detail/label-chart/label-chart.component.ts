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
  chartConstructor = 'chart';


  labelChartMetric = 'Throughput';
  labelChartOptions;
  updateLabelChartFlag = false;
  throughputChartOptions;
  networkChartOptions;
  responseTimeChartOptions;
  charts = ['Throughput', 'Response Time'];

  constructor() { }

  ngOnInit() {
    const { responseTime, threads, throughput, network } = this.plot;

    const threadLine = { ...threadLineSettings, name: 'virtual users', data: threads };

    if (network) {
      this.charts.push('Network');
      const networkMbps = network.map((_) => {
        _.data = _.data.map(__ => [__[0], bytesToMbps(__[1])]);
        return _;
      });
      console.log(networkMbps)

      this.networkChartOptions = { ...commonGraphSettings('mbps'), series: [...networkMbps, ...threadLine], ...logScaleButton }
    }


    this.responseTimeChartOptions = {
      ...commonGraphSettings('ms'), series: [...responseTime, ...threadLine], ...logScaleButton
    };
    this.throughputChartOptions = { ...commonGraphSettings('hits/s'), series: [...throughput, ...threadLine], ...logScaleButton };

    this.labelChartOptions = JSON.parse(JSON.stringify(this.throughputChartOptions));

  }

  changeChart(event) {
    const target = event.target.innerText;
    this.labelChartMetric = target;
    switch (target) {
      case 'Response Time':
        this.labelChartOptions = this.responseTimeChartOptions;
        break;
      case 'Throughput':
        this.labelChartOptions = this.throughputChartOptions;
        break;
      case 'Network':
        this.labelChartOptions = this.networkChartOptions;
        break;
    }


    this.updateLabelChartFlag = true;
  }



}
