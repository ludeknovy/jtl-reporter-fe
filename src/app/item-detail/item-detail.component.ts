import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemsApiService } from "../items-api.service";
import { ItemDetail } from "../items.service.model";
import { NgxSpinnerService } from "ngx-spinner";
import { DecimalPipe } from "@angular/common";
import * as Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import { commonGraphSettings, overallChartSettings, scatterChart } from "../graphs/item-detail";
import { catchError, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";
import { SharedMainBarService } from "../shared-main-bar.service";
import { ToastrService } from "ngx-toastr";
import { bytesToMbps } from "./calculations";
import { ItemStatusValue } from "./item-detail.model";
import { Metrics } from "./metrics";
import { AnalyzeChartService } from "../analyze-chart.service";
import { showZeroErrorWarning } from "../utils/showZeroErrorTolerance";
import { ItemChartService } from "../_services/item-chart.service";
exporting(Highcharts);


@Component({
  selector: "app-item-detail",
  templateUrl: "./item-detail.component.html",
  styleUrls: ["./item-detail.component.scss", "../shared-styles.css"],
  providers: [DecimalPipe]
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  Highcharts: typeof Highcharts = Highcharts;
  itemData: ItemDetail = {
    overview: null,
    environment: null,
    baseId: null,
    note: null,
    plot: null,
    resourcesLink: null,
    extraPlotData: null,
    reportStatus: null,
    histogramPlotData: null,
    hostname: null,
    statistics: [],
    name: null,
    monitoring: {
      cpu: {
        max: 0, data: []
      }
    },
    analysisEnabled: null,
    zeroErrorToleranceEnabled: null,
    topMetricsSettings: null,
    userSettings: null,
    errorSummary: null
  };
  overallChartOptions;
  scatterChartOptions;
  statusChartOptions;
  updateChartFlag = false;
  updateScatterChartFlag = false;
  itemParams;
  Math: any;
  token: string;
  isAnonymous = false;
  toggleThroughputBandFlag = false;
  chartLines;
  activeId = 1;
  performanceAnalysisLines = null;
  externalSearchTerm = null;
  totalRequests = null;


  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsApiService,
    private spinner: NgxSpinnerService,
    private sharedMainBarService: SharedMainBarService,
    private toastr: ToastrService,
    private analyzeChartService: AnalyzeChartService,
    private itemChartService: ItemChartService,
  ) {
    this.Math = Math;
  }


  async ngOnInit() {
    await this.spinner.show();
    this.route.params.pipe(
      withLatestFrom(_ => {
        this.sharedMainBarService.setProjectName(_.projectName);
        return _;
      })
    ).subscribe(_ => this.itemParams = _);
    this.route.queryParams.subscribe(_ => {
      this.token = _.token;
      if (this.token) {
        this.isAnonymous = true;
      }
    });
    this.itemsService.fetchItemDetail(
      this.itemParams.projectName,
      this.itemParams.scenarioName,
      this.itemParams.id,
      { token: this.token }
    )
      .pipe(catchError(r => {
        this.spinner.hide();
        return of(r);
      }))
      .subscribe((results) => {
        this.itemData = results;
        this.monitoringAlerts();
        this.itemChartService.setCurrentPlot(this.itemData.plot);
        this.selectedPlotSubscription();
        this.plotRangeSubscription();
        this.calculateTotalRequests();
        this.spinner.hide();
      });
    this.analyzeChartService.currentData.subscribe(data => {
      if (data) {
        this.activeId = 2;
      }
    });

    this.overallChartOptions = {
      ...overallChartSettings("ms")
    };
  }

  ngOnDestroy() {
    this.toastr.clear();
  }

  private selectedPlotSubscription() {
    this.itemChartService.selectedPlot$.subscribe((value) => {
      this.chartLines = value.chartLines;
      if (this.chartLines) {
        const overallChartSeries = Array.from(this.chartLines?.overall?.values());
        this.overallChartOptions.series = JSON.parse(JSON.stringify(overallChartSeries));
        const scatterResponseTimeData = value.chartLines.scatter.get(Metrics.ResponseTimeRaw);

        if (this.chartLines?.scatter?.has(Metrics.ResponseTimeRaw)) {
          this.scatterChartOptions = scatterChart
          this.scatterChartOptions.series = [{ data: scatterResponseTimeData, name: "Response Time", marker: {
              radius: 1
            }, }]
          this.updateScatterChartFlag = true
        }


        if (this.chartLines?.statusCodes?.has(Metrics.StatusCodeInTime)) {
          // initialize the chart options only when there are the status codes data
          this.statusChartOptions = {
            ...commonGraphSettings("")
          };
          const statusCodesLines = this.chartLines?.statusCodes.get(Metrics.StatusCodeInTime);
          this.statusChartOptions.series = JSON.parse(JSON.stringify(statusCodesLines.data));
        }
      }

      this.updateChartFlag = true;
    });
  }

  /**
   * Sets plot range (min, max)
   *
   */
  private plotRangeSubscription() {
    this.itemChartService.plotRange$.subscribe((value) => {
      if (value.start && value.end) {
        for (const chartOptions of [this.overallChartOptions, this.scatterChartOptions, this.statusChartOptions]) {
          chartOptions.xAxis.min = value.start.getTime()
          chartOptions.xAxis.max = value.end.getTime()
        }
        this.updateScatterChartFlag = true
        this.updateChartFlag = true;
      }
    })
  }


  private calculateTotalRequests() {
    this.totalRequests = this.itemData.statistics.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.samples;
    }, 0);
  }


  itemDetailChanged({ note, environment, hostname, name }) {
    this.itemData.note = note;
    this.itemData.environment = environment;
    this.itemData.hostname = hostname;
    this.itemData.name = name;
  }

  monitoringAlerts() {
    const alertMessages = [];
    const { max: maxCpu } = this.itemData.monitoring.cpu;
    if (maxCpu > 90) {
      alertMessages.push(`High CPU usage`);
    }

    if (alertMessages.length > 0) {
      this.toastr.warning(alertMessages.join("<br>"), "Monitoring Alert!",
        {
          closeButton: true,
          disableTimeOut: true,
          enableHtml: true,
        });
    }
  }

  getTextStatus(status) {
    for (const k in ItemStatusValue) {
      if (ItemStatusValue[k] === status) {
        return k;
      }
    }
  }

  toggleThroughputBand({ element, perfAnalysis }) {
    this.overallChartOptions.series.forEach(series => {
      if ([Metrics.ResponseTimeAvg, Metrics.ErrorRate, Metrics.Network].includes(series.name)) {
        series.visible = this.toggleThroughputBandFlag;
      }
      if (series.name === Metrics.Throughput) {
        if (this.toggleThroughputBandFlag) {
          series.zones = [];
          return;
        }
        series.zones = [{
          value: this.itemData.overview.throughput,
          color: "#e74c3c"
        }];
      }
    });

    if (!this.toggleThroughputBandFlag) {
      element.textContent = "Hide in chart";
      this.toggleThroughputBandFlag = true;
    } else {
      element.textContent = "Display in chart";
      this.overallChartOptions.xAxis.plotBands = null;
      this.toggleThroughputBandFlag = false;
    }
    this.updateChartFlag = true;
  }

  convertBytesToMbps(bytes) {
    return bytesToMbps(bytes);
  }

  showZeroErrorToleranceWarning(): boolean | string {
    if (this.itemData.zeroErrorToleranceEnabled) {
      return showZeroErrorWarning(this.itemData.overview.errorRate,
        this.itemData.overview.errorCount);
    }
    return false;
  }

  focusOnLabel($event: { label: string, metrics: Metrics[] }) {
    this.activeId = 2;
    this.performanceAnalysisLines = $event;
    this.externalSearchTerm = $event.label;
  }


  chartCallback: Highcharts.ChartCallbackFunction = function (chart): void {
    setTimeout(() => {
      chart.reflow();
    }, 0);
  };
}
