import { Component, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { labelTrendChartOptions, emptyChart } from "src/app/graphs/label-trend";
import { LabelApiService } from "src/app/label-api.service";
import * as Highcharts from "highcharts";
import { ItemParams } from "src/app/scenario/item-controls/item-controls.model";


@Component({
  selector: "app-label-trend",
  templateUrl: "./label-trend.component.html",
  styleUrls: ["./label-trend.component.css"]
})
export class LabelTrendComponent {
  @Input() params: ItemParams;

  Highcharts: typeof Highcharts = Highcharts;
  chart;
  updateFlag = false;
  labelChartOption;
  vuFilters;
  chartCallback

  @Input() trendInput: { labelName: string, environment: string };

  constructor(
    private modalService: NgbModal,
    private labelApiService: LabelApiService,
  ) {
    this.chartCallback = chart => {
      this.chart = chart;
    };
  }



  open(content) {
    this.modalService.open(content, { size: "xl", windowClass: "label-modal" }).result
      .then((_) => { this.labelChartOption = null; }, () => { this.labelChartOption = null; });
    this.fetchTrendData();

    this.labelApiService.fetchLabelMaxVu(
      this.params.projectName,
      this.params.scenarioName,
      this.params.id,
      this.trendInput.labelName,
      { environment: this.trendInput.environment }
    ).subscribe(__ => {
      this.vuFilters = __.result.filter((r) => r.count >= 2).map((r) => r.maxVu);
    });
  }

  filterByVu(event) {
    const filterVu = event.target.value;
    this.fetchTrendData(filterVu);
  }

  fetchTrendData(virtualUsers?) {
    this.labelApiService.fetchLabelTrend(
      this.params.projectName,
      this.params.scenarioName,
      this.params.id,
      this.trendInput.labelName,
      {
        environment: this.trendInput.environment,
        virtualUsers
      }
    ).subscribe((_) => {
      this.labelChartOption = _.timePoints.length >= 2 ? labelTrendChartOptions(_) : emptyChart();
      this.updateFlag = true;
    });
  }

  onCheckboxChange(event) {
    const enabled = event.target.checked
    this.chart.series.forEach(serie => serie.update({ dataLabels: { enabled } }))
  }
}
