import { Component, OnInit, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ItemsService } from "src/app/items.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { IScenarios, ItemDetail, Items } from "src/app/items.service.model";
import { ItemsApiService } from "src/app/items-api.service";
import { ComparisonChartService } from "../../_services/comparison-chart.service";
import { ToastService } from "../../_services/toast.service";
import { ComparisonStatsService } from "../../_services/comparison-stats.service";
import { ScenarioApiService } from "../../scenario-api.service";
import { AnalyticsService, ComparisonType } from "../../_services/analytics.service";
import { EMPTY } from "rxjs";
import { catchError } from "rxjs/operators";

const LIMIT = 15;
const OFFSET = 15;


@Component({
    selector: 'app-stats-compare',
    templateUrl: './stats-compare.component.html',
    styleUrls: ['./stats-compare.component.css'],
    standalone: false
})

export class StatsCompareComponent implements OnInit {
  items$: Observable<Items>;
  page = 1;
  pageSize = LIMIT;
  params: Params;
  selectedTestItem: string;
  comparingData: ItemDetail;
  comparedMetadata: { id: string; maxVu: number };
  comparisonWarning = [];
  scenarios: IScenarios[];
  selectedScenario: string;


  @Input() itemData: ItemDetail;

  constructor(
    private toast: ToastService,
    private modalService: NgbModal,
    private itemsService: ItemsService,
    private itemApiService: ItemsApiService,
    private itemsApiService: ItemsApiService,
    private route: ActivatedRoute,
    private comparisonChartService: ComparisonChartService,
    private comparisonStatsService: ComparisonStatsService,
    private scenarioApiService: ScenarioApiService,
    private analyticsService: AnalyticsService,
  ) {
  }

  ngOnInit() {
    this.items$ = this.itemsService.items$;
    this.route.params.subscribe(_ => {
      this.params = _;
      this.selectedScenario = _.scenarioName;
    });
    this.scenarioApiService.fetchScenarios(this.params.projectName).subscribe(_ => {
      this.scenarios = _;
    });
  }

  open(content) {
    this.modalService.open(content, { size: "xl" });
    this.itemsService.fetchItems(this.params.projectName, this.selectedScenario, { limit: LIMIT, offset: 0 });
  }

  loadMore() {
    const offset = (this.page - 1) * OFFSET;
    this.itemsService.fetchItems(this.params.projectName, this.selectedScenario, { limit: LIMIT, offset });
  }

  onSelectionChange(id) {
    this.selectedTestItem = id;
  }

  loadItemToCompare() {
    if (this.selectedTestItem) {
      this.itemsApiService.fetchItemDetail(this.params.projectName, this.selectedScenario, this.selectedTestItem)
        .pipe(catchError(() => EMPTY))
        .subscribe(_ => {
          if (!_.overview) {
            return;
          }
          this.itemToCompare({
            statistics: _.statistics,
            maxVu: _.overview.maxVu,
            id: this.selectedTestItem,
            environment: _.environment,
            plot: _.plot,
            histogramPlotData: _.histogramPlotData,
            extraPlotData: _.extraPlotData,
            startDate: _.overview.startDate,
            endDate: _.overview.endDate,
            monitoring: _.monitoring,
          }, "manual");
          this.page = 0;
          this.modalService.dismissAll();
        });
    }
  }

  quickBaseComparison(id) {
    this.itemApiService.fetchItemDetail(
      this.params.projectName,
      this.params.scenarioName,
      id)
      .pipe(catchError(() => EMPTY))
      .subscribe(_ => {
        if (!_.overview) {
          return;
        }
        this.itemToCompare({
          statistics: _.statistics,
          maxVu: _.overview.maxVu,
          environment: _.environment,
          plot: _.plot,
          histogramPlotData: _.histogramPlotData,
          extraPlotData: _.extraPlotData,
          startDate: _.overview.startDate,
          endDate: _.overview.endDate,
          monitoring: _.monitoring,
          id
        }, "baseline");
      });
  }

  itemToCompare(data, comparisonType: ComparisonType) {
    this.resetStatsData();
    this.comparisonChartService.setComparisonPlot(data.plot, data.extraPlotData, data.startDate, data.endDate, data.monitoring?.cpu?.data);
    this.comparisonChartService.setHistogramPlot(data.histogramPlotData);
    this.comparingData = data;
    this.comparedMetadata = { id: data.id, maxVu: data.maxVu };
    if (data.maxVu !== this.itemData.overview.maxVu) {
      this.comparisonWarning.push(`VU do differ ${this.itemData.overview.maxVu} vs. ${data.maxVu}`);
    }

    if (data.environment !== this.itemData.environment) {
      this.comparisonWarning.push("Environments do differ");
    }
    this.comparisonStatsService.setRequestStats(data.statistics);
    this.analyticsService.track("comparisonOpened", { comparisonType });

    if (this.comparisonWarning.length) {
      this.showComparisonWarnings();
    }
  }

  showComparisonWarnings() {
    this.toast.warning(this.comparisonWarning.join("<br>"), "Comparison Warning!",
      {
        closeButton: true,
        enableHtml: true,
        timeOut: 15000,
        positionClass: "toast-bottom-right"
      });
    this.comparisonWarning = [];
  }

  resetStatsData() {
    this.comparingData = null;
    this.comparisonChartService.resetPlot();
    this.comparisonStatsService.setRequestStats(null);
  }

  loadScenario(event) {
    const scenario = event.target.value
    this.selectedScenario = scenario
    this.itemsService.fetchItems(this.params.projectName, scenario, { limit: LIMIT, offset: 0 });
  }
}
