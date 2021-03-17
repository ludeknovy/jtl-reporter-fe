import { Component, Input, OnInit } from '@angular/core';
import { commonGraphSettings } from 'src/app/graphs/item-detail';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-analyze-charts',
  templateUrl: './analyze-charts.component.html',
  styleUrls: ['./analyze-charts.component.css', '../item-detail.component.scss']
})
export class AnalyzeChartsComponent implements OnInit {

  @Input() chartLines: {
    labels: Map<string, object>,
    overall: Map<string, object>,
  };
  Highcharts: typeof Highcharts = Highcharts;

  customChartsOptions;
  updateLabelChartFlag = false;

  constructor() { }

  ngOnInit() {
    this.customChartsOptions = { ...commonGraphSettings(""), series: [] }
  }

  

}
