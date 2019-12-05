import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { labelTrendChartOptions, emptyChart } from 'src/app/graphs/label-trend';
import { LabelApiService } from 'src/app/label-api.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-label-trend',
  templateUrl: './label-trend.component.html',
  styleUrls: ['./label-trend.component.css']
})
export class LabelTrendComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chart;
  chartConstructor = 'chart';
  chartCallback;
  updateFlag = false;
  params;
  labelChartOption;
  vuFilters;

  @Input() trendInput: { labelName: string, environment: string };

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
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
      .then((_) => { this.labelChartOption = null; }, () => { this.labelChartOption = null; });
    this.route.params.subscribe(_ => {
      this.params = _;
      this.fetchTrendData();

      this.labelApiService.fetchLabelMaxVu(
        this.params.projectName,
        this.params.scenarioName,
        this.params.id,
        this.trendInput.labelName,
        { environment: this.trendInput.environment }
      )
        .subscribe(__ => {
          this.vuFilters = __.result.filter((r) => r.count > 5).map((r) => r.maxVu);
        });
    });
  }

  updateData() {
    this.updateFlag = true;
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
      this.labelChartOption = _.timePoints.length > 5 ? labelTrendChartOptions(_) : emptyChart();
      this.updateData();
    });
  }
}
