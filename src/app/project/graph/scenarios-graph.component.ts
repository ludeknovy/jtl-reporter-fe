import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
} from "@angular/core";
import { Chart } from "chart.js";
import { scenarioHistory } from "src/app/graphs/scenarios";
import { normalizeOverviewData } from "../../utils/normalizeOverviewData";

@Component({
  selector: "app-scenarios-graph",
  templateUrl: "./scenarios-graph.component.html",
  styleUrls: ["./scenarios-graph.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ScenariosGraphComponent implements AfterViewInit, OnDestroy {

  @Input() graphData: any;
  @ViewChild("graphCanvasRef", { static: true }) chartCanvas: ElementRef;
  @HostBinding("class.chart") htmlCardClass = true;

  private chart: Chart;

  ngAfterViewInit(): void {
    this.destroyChart();
    let length = 1;

    Chart.pluginService.register({

      // before the update ..
      beforeUpdate: function(chart) {
        if (chart.config.data.datasets.length === 0) {
          return;
        }
        const data = chart.config.data;
        for (let i = data.labels.length; i < data.maxBarNumber; i++) {
          length = (length === -1) ? i : length;
          // populates both arrays with default values, you can put anything though
          data.labels[i] = i;
          data.datasets[0].data[i] = 0;
        }
      },
      // after the update
      afterUpdate: function(chart) {
        if (length === -1) { return; }
      },

      afterDraw: function(chart) {
        if (chart.data.datasets.length === 0) {
          // No data is present
          const ctx = chart.chart.ctx;
          const width = chart.chart.width;
          const height = chart.chart.height;
          chart.clear();

          ctx.save();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "20px normal 'Helvetica Nueue'";
          ctx.fillText("No data to display", width / 2, height / 2);
          ctx.restore();
        }
      }
    });
    this.chart = new Chart(this.chartCanvas.nativeElement, scenarioHistory(this.graphData.map(normalizeOverviewData)));
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private destroyChart(): void {
    // tslint:disable-next-line:no-unused-expression
    this.chart && this.chart.destroy();
  }

}
