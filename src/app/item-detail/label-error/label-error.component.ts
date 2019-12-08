import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LabelApiService } from 'src/app/label-api.service';
import * as Highcharts from 'highcharts';
import { emptyResponseCodesChart } from 'src/app/graphs/label-errors';
import { from } from 'rxjs';

@Component({
  selector: 'app-label-error',
  templateUrl: './label-error.component.html',
  styleUrls: ['./label-error.component.css']
})
export class LabelErrorComponent implements OnInit {

  @Input() labelInput: any;
  Highcharts: typeof Highcharts = Highcharts;
  chart: Highcharts.Chart;
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
    .then((_) => { this.labelErrorChartOption = null; }, () => { this.labelErrorChartOption = null; });

    const { projectName, scenarioName, id } = this.labelInput.params;


    from(new Promise(resolve => setTimeout(resolve, 100))).subscribe((val: any) => {
      this.labelErrorChartOption = emptyResponseCodesChart;
    });
    from(new Promise(resolve => setTimeout(resolve, 300))).subscribe((val: any) => {

      this.chart.showLoading();

      this.labelApiService.fetchLabelErrors(projectName, scenarioName, id, this.labelInput.labelName)
        .subscribe((_) => {
          this.chart.hideLoading();
          const errors = Object.keys(_.stat).map((e) => {
            return [e, _.stat[e]];
          });
          this.chart.series[0].setData(errors);
        });
    });
  }



}
