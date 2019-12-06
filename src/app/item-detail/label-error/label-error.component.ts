import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LabelApiService } from 'src/app/label-api.service';
import * as Highcharts from 'highcharts';
import { responseCodesChart } from 'src/app/graphs/label-errors';

@Component({
  selector: 'app-label-error',
  templateUrl: './label-error.component.html',
  styleUrls: ['./label-error.component.css']
})
export class LabelErrorComponent implements OnInit {

  @Input() labelInput: any;
  Highcharts: typeof Highcharts = Highcharts;
  chart;
  chartConstructor = 'chart';
  chartCallback;
  updateFlag = false;
  labelErrors;
  labelErrorChartOption;

  constructor(
    private modalService: NgbModal,
    private labelApiService: LabelApiService,
  ) {
    const self = this;
    this.chartCallback = chart => {
      self.chart = chart;
    };
  }

  ngOnInit() {
  }

  open(content) {
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' }).result
      .then((_) => { this.labelErrorChartOption = null; }, () => { this.labelErrorChartOption = null; });;
    const { projectName, scenarioName, id } = this.labelInput.params;
    this.labelApiService.fetchLabelErrors(projectName, scenarioName, id, this.labelInput.labelName)
      .subscribe((_) => {
        const errors = Object.keys(_.stat).map((e) => {
          return [e, _.stat[e]]
        });
        this.labelErrorChartOption = responseCodesChart(errors);
      });
  }

}
