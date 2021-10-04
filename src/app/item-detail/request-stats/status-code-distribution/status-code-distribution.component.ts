import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import { statusCodesChart } from 'src/app/graphs/status-codes';
import Tree from 'highcharts/modules/treemap';
Tree(Highcharts);

@Component({
  selector: 'app-status-code-distribution',
  templateUrl: './status-code-distribution.component.html',
  styleUrls: ['./status-code-distribution.component.css']
})
export class StatusCodeDistributionComponent implements OnInit {

  @Input() statusCodes: StatusCodes[];
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
    const dataPoints = this.statusCodes.map((_) => ({
      name: _.statusCode.toString(),
      value: _.count
    }));
    this.labelChartOption = statusCodesChart(dataPoints);
    this.updateFlag = true;
  }

}

export interface StatusCodes {
  statusCode: number;
  count: number;
}
