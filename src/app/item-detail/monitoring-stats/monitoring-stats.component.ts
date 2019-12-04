import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'angular-highcharts';
import { monitoringGraphSettings } from 'src/app/graphs/monitoring';

@Component({
  selector: 'app-monitoring-stats',
  templateUrl: './monitoring-stats.component.html',
  styleUrls: ['./monitoring-stats.component.css']
})
export class MonitoringStatsComponent implements OnInit {
  monitoringChart;
  constructor(
    private modalService: NgbModal,
  ) { }

  @Input() data: any;

  ngOnInit() {
  }

  open(content) {
    this.monitoringChart = new Chart({
      ...monitoringGraphSettings(), series: [
        { data: this.data.cpu, name: 'cpu' }, { data: this.data.mem, name: 'mem' }]
    });
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' });
  }

}
