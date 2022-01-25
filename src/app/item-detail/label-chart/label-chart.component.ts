import { Component, Input, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { commonGraphSettings } from "src/app/graphs/item-detail";
import * as deepmerge from "deepmerge";

@Component({
  selector: "app-label-chart",
  templateUrl: "./label-chart.component.html",
  styleUrls: ["./label-chart.component.css", "../item-detail.component.scss"]
})
export class LabelChartComponent implements OnInit {

  @Input() labels: Map<string, object>;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "chart";
  labelChartMetric = "Throughput";
  labelCompareChartMetric;
  labelChartOptions = commonGraphSettings("hits/s");
  updateLabelChartFlag = false;
  chartKeys;
  seriesVisibilityToggle = true;
  seriesVisibilityToggleText = "Hide all";
  chartShouldExpand = false;
  chart;

  ngOnInit() {
    this.labelChartOptions = deepmerge(this.labels.get(this.labelChartMetric), {});
    this.updateLabelChartFlag = true;
    this.getChartsKey();
  }

  private getChartsKey() {
    this.chartKeys = Array.from(this.labels.keys());
  }

  changeChart(event) {
    this.labelChartMetric = event.target.innerText;

    this.labelChartOptions = deepmerge(this.labels.get(this.labelChartMetric), {});

    this.updateLabelChartFlag = true;
  }

  toggleSeriesVisibility() {
    this.labelChartOptions.series.map(_ => _.visible = !this.seriesVisibilityToggle);
    this.seriesVisibilityToggleText = this.seriesVisibilityToggle ? "Show all" : "Hide all";
    this.seriesVisibilityToggle = !this.seriesVisibilityToggle;
    this.updateLabelChartFlag = true;
  }

  collapseChart() {
    this.chartShouldExpand = !this.chartShouldExpand;
    this.chart.setSize(undefined, this.chartShouldExpand ? 650 : 350);
  }


  getInstance(chart): void {
    this.chart = chart;
 }
}
