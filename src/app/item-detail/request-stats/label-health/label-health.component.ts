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
  Highcharts: typeof Highcharts = Highcharts;
  labelChartOption;
  updateFlag = false;
  chartConstructor = 'chart';
  chartCallback: Highcharts.ChartCallbackFunction = function (chart): void {
    setTimeout(() => {
        chart.reflow();
    }, 0);
  };


  constructor(
    private modalService: NgbModal,
  ) {
   }

  ngOnInit() {
  }

  open(content) {
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' });

    this.labelChartOption = statusCodesChart(this.statusCodes);
    this.updateFlag = true;
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
