import { Component, OnInit, Input, } from "@angular/core";
import * as Highcharts from "highcharts";
import { monitoringGraphSettings } from "src/app/graphs/monitoring";
import { from } from "rxjs";
import { ComparisonChartService } from "../../_services/comparison-chart.service";
import { MonitoringData } from "../../items.service.model";
import { Metrics } from "../metrics";


@Component({
  selector: 'app-monitoring-stats',
  templateUrl: './monitoring-stats.component.html',
  styleUrls: ['./monitoring-stats.component.css', '../item-detail.component.scss', '../../shared-styles.css']
})
export class MonitoringStatsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  monitoringChartOptions;
  chartConstructor = "chart";
  chartCallback;
  updateFlag = false;
  updateComparisonChartFlag = false;
  monitoringComparisonChartOptions;
  chart;

  constructor(
    private comparisonChartService: ComparisonChartService,
  ) {
    this.chartCallback = chart => {
      this.chart = chart;
    };
  }

  @Input() data: MonitoringData[];

  ngOnInit() {
    const series = this.prepareChartSeries(this.data);
    from(new Promise(resolve => setTimeout(resolve, 50))).subscribe((val: any) => {
      this.monitoringChartOptions = {
        ...monitoringGraphSettings(), series: series
      };
      this.updateFlag = true;
    });
    this.comparisonChartService.selectedPlot$.subscribe(plot => {
      if (plot && plot?.chartLines?.monitoring.has(Metrics.Monitoring)) {
        const comparisonSeries = this.prepareChartSeries(plot?.chartLines.monitoring.get(Metrics.Monitoring));
        this.monitoringComparisonChartOptions = {
          ...monitoringGraphSettings(),
          series: comparisonSeries,
        };
        this.updateComparisonChartFlag = true;
      } else {
        this.monitoringComparisonChartOptions = null
      }
    });
  }


  prepareChartSeries(data: MonitoringData[]) {
    const workers = Array.from(new Set(data.map(data => data.name)));
    return workers.map((worker) => data
      .filter(data => data.name === worker)
      .reduce((acc, current) => {
        acc.data.cpu.push([current.timestamp, current.avgCpu]);
        acc.data.mem.push([current.timestamp, current.avgMem]);
        acc.name = current.name;
        return acc;
      }, { data: { cpu: [], mem: [] }, name: null }))
      .map((worker) => [{ data: worker.data.cpu, name: worker.name + " - cpu" }, { data: worker.data.mem, name: worker.name + " - mem" }])
      .flat();
  }
}
