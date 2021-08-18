import { Component, OnInit, Input, } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import { monitoringGraphSettings } from 'src/app/graphs/monitoring';
import { from } from 'rxjs';


@Component({
  selector: 'app-monitoring-stats',
  templateUrl: './monitoring-stats.component.html',
  styleUrls: ['./monitoring-stats.component.css']
})
export class MonitoringStatsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  monitoringChartOptions;
  chartConstructor = 'chart';
  chartCallback;
  updateFlag = false;
  chart;
  constructor(
    private modalService: NgbModal,

  ) {
    this.chartCallback = chart => {
      this.chart = chart;
    };
  }

  @Input() data: [{ name: string, timestemp: Date, avgCpu: number }];

  ngOnInit() {
  }


  open(content) {
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' }).result
      .then((_) => { this.monitoringChartOptions = null; }, () => { this.monitoringChartOptions = null; });

    console.log(this.data)
    const workers = Array.from(new Set(this.data.map(data => data.name)));
    const series = workers.map((worker) => this.data.filter(data => data.name === worker).reduce((acc, current) => {
      acc.data.push([current.timestemp, current.avgCpu]);
      acc.name = current.name;
      return acc;
    }, { data: [], name: null }))

    from(new Promise(resolve => setTimeout(resolve, 50))).subscribe((val: any) => {
      this.monitoringChartOptions = {
        ...monitoringGraphSettings(), series: series
      };
      this.updateFlag = true;
    });
  }
}
