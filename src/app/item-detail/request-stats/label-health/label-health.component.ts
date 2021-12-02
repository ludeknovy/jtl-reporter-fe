import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import { statusCodesChart } from 'src/app/graphs/status-codes';
import Tree from 'highcharts/modules/treemap';
Tree(Highcharts);

@Component({
  selector: 'app-label-health',
  templateUrl: './label-health.component.html',
  styleUrls: ['./label-health.component.css']
})
export class LabelHealthComponent implements OnInit {

  @Input() statusCodes: StatusCodes[];
  @Input() responseFailures: ResponseMessageFailures[];
  @Input() labelName: string;
  @Input() errorRate: number;
  Highcharts: typeof Highcharts = Highcharts;
  labelChartOption;
  updateFlag = false;
  chartConstructor = 'chart';
  showBelowPrecisionWarning = false;
  chartCallback: Highcharts.ChartCallbackFunction = function (chart): void {
    setTimeout(() => {
        chart.reflow();
    }, 0);
  };


  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.showBelowPrecisionWarning = this.isBellowPrecisionError();
  }

  open(content) {
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' });

    this.labelChartOption = statusCodesChart(this.statusCodes);
    this.updateFlag = true;
  }

  private isBellowPrecisionError() {
    const numberOfFailures = this.responseFailures.reduce((acc, nextValue) => {
      acc += nextValue.count;
      return acc;
    }, 0);
    return this.errorRate === 0 && numberOfFailures > 0;
  }

}

export interface StatusCodes {
  statusCode: number;
  count: number;
}

export interface ResponseMessageFailures {
  responseMessage: number;
  count: number;
}
