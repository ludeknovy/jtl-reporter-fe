import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { monitoringGraphSettings } from 'src/app/graphs/monitoring';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-monitoring-stats',
  templateUrl: './monitoring-stats.component.html',
  styleUrls: ['./monitoring-stats.component.css']
})
export class MonitoringStatsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  monitoringChartOptions;
  constructor(
    private modalService: NgbModal,
  ) { }

  @Input() data: any;

  ngOnInit() {
  }

  open(content) {
    this.monitoringChartOptions = {
      ...monitoringGraphSettings(), series: [
        { data: this.data.cpu, name: 'cpu' }, { data: this.data.mem, name: 'mem' }]
    };
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' });
  }

}
