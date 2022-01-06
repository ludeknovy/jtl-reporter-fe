import { Component, OnInit, Input, } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as Highcharts from "highcharts";
import { monitoringGraphSettings } from "src/app/graphs/monitoring";
import { from } from "rxjs";


@Component({
  selector: "app-monitoring-stats",
  templateUrl: "./monitoring-stats.component.html",
  styleUrls: ["./monitoring-stats.component.css"]
})
export class MonitoringStatsComponent {
  Highcharts: typeof Highcharts = Highcharts;
  monitoringChartOptions;
  chartConstructor = "chart";
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

  @Input() data: [{ name: string, timestamp: Date, avgCpu: number, avgMem: number }];


  open(content) {
    this.modalService.open(content, { size: "xl" }).result
      .then((_) => { this.monitoringChartOptions = null; }, () => { this.monitoringChartOptions = null; });

    const workers = Array.from(new Set(this.data.map(data => data.name)));
    const series = workers.map((worker) => this.data
      .filter(data => data.name === worker)
      .reduce((acc, current) => {
        acc.data.cpu.push([current.timestamp, current.avgCpu]);
        acc.data.mem.push([current.timestamp, current.avgMem]);
        acc.name = current.name;
        return acc;
      }, { data: { cpu: [], mem: [] }, name: null }))
      .map((worker) => [{ data: worker.data.cpu, name: worker.name + " - cpu" }, { data: worker.data.mem, name: worker.name + " - mem" }])
      .flat();

    from(new Promise(resolve => setTimeout(resolve, 50))).subscribe((val: any) => {
      this.monitoringChartOptions = {
        ...monitoringGraphSettings(), series: series
      };
      this.updateFlag = true;
    });
  }
}
