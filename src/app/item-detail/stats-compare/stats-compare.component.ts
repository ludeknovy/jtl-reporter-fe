import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ItemsService } from "src/app/items.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import {ItemDetail, Items} from 'src/app/items.service.model';
import { ItemsApiService } from "src/app/items-api.service";
import {ComparisonChartService} from '../../_services/comparison-chart.service';
import {ToastrService} from 'ngx-toastr';
import {ComparisonStatsService} from '../../_services/comparison-stats.service';

const LIMIT = 15;
const OFFSET = 15;


@Component({
  selector: "app-stats-compare",
  templateUrl: "./stats-compare.component.html",
  styleUrls: ["./stats-compare.component.css"]
})

export class StatsCompareComponent implements OnInit {
  items$: Observable<Items>;
  page = 1;
  pageSize = LIMIT;
  params;
  selectedTestItem;

  comparingData;
  comparedData;
  comparedMetadata;
  comparisonWarning = [];



  @Input() itemData: ItemDetail

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private itemsService: ItemsService,
    private itemsApiService: ItemsApiService,
    private route: ActivatedRoute,
    private comparisonChartService: ComparisonChartService,
    private comparisonStatsService: ComparisonStatsService
  ) { }

  ngOnInit() {
    this.items$ = this.itemsService.items$;
  }

  open(content) {
    this.modalService.open(content, { size: "xl" });
    this.route.params.subscribe(_ => {
      this.params = _;
      this.itemsService.fetchItems(this.params.projectName, this.params.scenarioName, { limit: LIMIT, offset: 0 });
    });
  }

  loadMore() {
    const offset = (this.page - 1) * OFFSET;
    this.itemsService.fetchItems(this.params.projectName, this.params.scenarioName, { limit: LIMIT, offset });
  }

  onSelectionChange(id) {
    this.selectedTestItem = id;
  }

  loadItemToCompare() {
    if (this.selectedTestItem) {
      this.itemsApiService.fetchItemDetail(this.params.projectName, this.params.scenarioName, this.selectedTestItem)
        .subscribe(_ => {
          this.itemToCompare({
            statistics: _.statistics,
            maxVu: _.overview.maxVu,
            id: this.selectedTestItem,
            environment: _.environment,
            plot: _.plot,
            histogramPlotData: _.histogramPlotData,
            extraPlotData: _.extraPlotData
          });
          this.page = 0;
          this.modalService.dismissAll();
        });
    }
  }

  quickBaseComparison(id) {
    // this.itemsService.fetchItemDetail(
    //   this.params.projectName,
    //   this.params.scenarioName,
    //   id).subscribe(_ => this.itemToCompare({
    //   statistics: _.statistics,
    //   maxVu: _.overview.maxVu,
    //   environment: _.environment,
    //   plot: _.plot,
    //   histogramPlotData: _.histogramPlotData,
    //   extraPlotData: _.extraPlotData,
    //   id
    // }));
  }

  itemToCompare(data) {
    this.resetStatsData();
    this.comparisonChartService.setComparisonPlot(data.plot, data.extraPlotData);
    this.comparisonChartService.setHistogramPlot(data.histogramPlotData);
    this.comparingData = data;
    this.comparedMetadata = { id: data.id, maxVu: data.maxVu };
    if (data.maxVu !== this.itemData.overview.maxVu) {
      this.comparisonWarning.push(`VU do differ ${this.itemData.overview.maxVu} vs. ${data.maxVu}`);
    }

    // this.comparedDataMs = this.labelsData.map((_) => {
    //   const labelToBeCompared = data.statistics.find((__) => __.label === _.label);
    //   if (labelToBeCompared) {
    //     return {
    //       ..._,
    //       samples: (_.samples - labelToBeCompared.samples),
    //       avgResponseTime: (_.avgResponseTime - labelToBeCompared.avgResponseTime),
    //       minResponseTime: (_.minResponseTime - labelToBeCompared.minResponseTime),
    //       maxResponseTime: (_.maxResponseTime - labelToBeCompared.maxResponseTime),
    //       medianResponseTime: (_.medianResponseTime - labelToBeCompared.medianResponseTime),
    //       bytes: ((_.bytes - labelToBeCompared.bytes) / 1024).toFixed(2),
    //       bytesPerSecond: (_.bytesPerSecond - labelToBeCompared.bytesPerSecond),
    //       bytesSentPerSecond: (_.bytesSentPerSecond - labelToBeCompared.bytesSentPerSecond),
    //       n0: (_.n0 - labelToBeCompared.n0),
    //       n5: (_.n5 - labelToBeCompared.n5),
    //       n9: (_.n9 - labelToBeCompared.n9),
    //       errorRate: (_.errorRate - labelToBeCompared.errorRate),
    //       throughput: (_.throughput - labelToBeCompared.throughput)
    //     };
    //   } else {
    //     this.comparisonWarning.push(`${_.label} label not found`);
    //     return {
    //       ..._,
    //       avgResponseTime: null,
    //       minResponseTime: null,
    //       maxResponseTime: null,
    //       medianResponseTime: null,
    //       n0: null,
    //       n5: null,
    //       n9: null,
    //       errorRate: null,
    //       throughput: null,
    //       bytes: null,
    //     };
    //   }
    // });
    if (data.environment !== this.itemData.environment) {
      this.comparisonWarning.push("Environments do differ");
    }
    this.comparisonStatsService.setRequestStats(this.comparedData)

    if (this.comparisonWarning.length) {
      this.showComparisonWarnings();
    }
  }

  showComparisonWarnings() {
    this.toastr.warning(this.comparisonWarning.join("<br>"), "Comparison Warning!",
      {
        closeButton: true,
        enableHtml: true,
        timeOut: 15000,
        positionClass: "toast-bottom-right"
      });
    this.comparisonWarning = [];
  }

  resetStatsData() {
    this.comparedData = null;
    this.comparisonChartService.resetPlot();
    this.comparisonStatsService.setRequestStats(this.itemData.statistics)
  }



}
