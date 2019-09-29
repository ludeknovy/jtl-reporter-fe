import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ItemsApiService } from 'src/app/items-api.service';
import { Chart } from 'angular-highcharts';
import { labelTrendChartOptions, emptyChart } from 'src/app/graphs/label-trend';


@Component({
  selector: 'app-label-trend',
  templateUrl: './label-trend.component.html',
  styleUrls: ['./label-trend.component.css']
})
export class LabelTrendComponent implements OnInit {
  params;
  labelChart;

  @Input() trendInput: { labelName: string, environment: string };

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private itemsApiService: ItemsApiService,
  ) { }

  ngOnInit() {
  }

  open(content) {
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' });
    this.route.params.subscribe(_ => {
      this.params = _;
      this.itemsApiService.fetchLabelTrend(
        this.params.projectName,
        this.params.scenarioName,
        this.params.id,
        {
          label: this.trendInput.labelName,
          environment: this.trendInput.environment
        }
      ).subscribe(__ => {
        const chartOptions: any = __.timePoints.length > 5 ? labelTrendChartOptions(__) : emptyChart();
        this.labelChart = new Chart(...chartOptions);
      });
    });
  }
}