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

  @Input() data: any;

  ngOnInit() {
  }


  open(content) {
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' }).result
      .then((_) => { this.monitoringChartOptions = null; }, () => { this.monitoringChartOptions = null; });

    from(new Promise(resolve => setTimeout(resolve, 50))).subscribe((val: any) => {
      this.monitoringChartOptions = {
        ...monitoringGraphSettings(), series: [
          { data: this.data.cpu, name: 'cpu' }, { data: this.data.mem, name: 'mem' }]
      };
      this.updateFlag = true;
    });
  }
}
