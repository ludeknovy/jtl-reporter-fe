import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { labelTrendChartOptions, emptyChart } from 'src/app/graphs/label-trend';
import { Observable } from 'rxjs';
import { LabelTrend } from 'src/app/items.service.model';
import { LabelApiService } from 'src/app/label-api.service';


@Component({
  selector: 'app-label-trend',
  templateUrl: './label-trend.component.html',
  styleUrls: ['./label-trend.component.css']
})
export class LabelTrendComponent implements OnInit {
  params;
  labelChart;
  vuFilters;
  labelTrend$: Observable<LabelTrend>;

  @Input() trendInput: { labelName: string, environment: string };

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private labelApiService: LabelApiService,

  ) {
    this.labelTrend$ = labelApiService.labelTrend$;
  }

  ngOnInit() {
  }

  open(content) {
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' });
    this.route.params.subscribe(_ => {
      this.params = _;
      this.labelApiService.fetchLabelTrend(
        this.params.projectName,
        this.params.scenarioName,
        this.params.id,
        this.trendInput.labelName,
        { environment: this.trendInput.environment }
      );
      this.labelTrend$.subscribe((trend) => {
        const chartOptions: any = trend.timePoints.length > 5 ? labelTrendChartOptions(trend) : emptyChart();
        this.labelChart = new Chart(...chartOptions);
      });
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

  filterByVu(event) {
    const filterVu = event.target.value;
    this.labelApiService.fetchLabelTrend(
      this.params.projectName,
      this.params.scenarioName,
      this.params.id,
      this.trendInput.labelName,
      {
        environment: this.trendInput.environment,
        virtualUsers: filterVu,
      }
    );
  }
}
