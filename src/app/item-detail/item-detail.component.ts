import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
import { getValidationResults } from "../utils/showZeroErrorTolerance";
import { ItemChartService } from "../_services/item-chart.service";
import { ComparisonChartService } from "../_services/comparison-chart.service";
import { ChartLine } from "../_services/chart-service-utils";
import { ItemChartOption } from "./item-chart-option";

exporting(Highcharts);


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss', '../shared-styles.css'],
  providers: [DecimalPipe]
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  @ViewChild('overallChart') componentRef;

  Highcharts: typeof Highcharts = Highcharts;
  chart: Highcharts.Chart;
  overallChart: Highcharts.Chart;

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
    errorSummary: null,
    status: null,
    minTestDuration: null,
  };
  overallChartOptions;
  scatterChartOptions;
  statusChartOptions;
  threadsPerThreadGroup;
  overallChartCallback;
  updateChartFlag = false;
  updateScatterChartFlag = false;
  updateOverallChartFlag = false;
  itemParams;
  Math: any;
  token: string;
  isAnonymous = true;
  toggleThroughputBandFlag = false;
  chartLines;
  activeId = 1;
  performanceAnalysisLines = null;
  totalRequests = null;
  plotRangeMin = null;
  plotRangeMax = null;
  validations = {
    zeroErrorValidation: null,
    minTestDurationValidation: null,
  };
  comparisonItemChartOptions = new ItemChartOption()
  comparisonChart: Highcharts.Chart;
  scatterChart: Highcharts.Chart;
  updateComparisonChartFlag = false;
  updateComparisonScatterChartFlag = false;
  comparisonChartCallback;
  comparisonScatterChartCallback

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsApiService,
    private spinner: NgxSpinnerService,
    private sharedMainBarService: SharedMainBarService,
    private toastr: ToastrService,
    private analyzeChartService: AnalyzeChartService,
    private itemChartService: ItemChartService,
    private comparisonChartService: ComparisonChartService,
  ) {
    this.Math = Math;
    this.overallChartCallback = chart => {
      this.overallChart = chart;
    };
    this.comparisonChartCallback = chart => {
      this.comparisonChart = chart;
    };
    this.comparisonScatterChartCallback = chart => {
      this.scatterChart = chart;
    };
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
      if (!this.token) {
        this.isAnonymous = false;
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
        this.itemChartService.setCurrentPlot(this.itemData.plot, this.itemData.monitoring.cpu.data);
        this.selectedPlotSubscription();
        this.plotRangeSubscription();
        this.comparisonSubscription();
        this.calculateTotalRequests();
        const validations = this.showValidationWarning(this.itemData);
        this.validations = {
          zeroErrorValidation: validations.zeroErrorToleranceValidation,
          minTestDurationValidation: validations.minTestDurationValidation
        };
        this;
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
    this.comparisonChartService.resetPlot()
  }

  private selectedPlotSubscription() {
    this.itemChartService.selectedPlot$.subscribe((value) => {
      this.chartLines = value.chartLines;
      const chartOptions = this.prepareChartOptions(value.chartLines)
      this.threadsPerThreadGroup = chartOptions.threadsPerThreadGroup
      this.overallChartOptions = chartOptions.overallChart
      this.statusChartOptions = chartOptions.statusChartOptions
      this.scatterChartOptions = chartOptions.scatterChartOptions
      this.updateScatterChartFlag = true;
      this.updateChartFlag = true;
    });
  }

  /**
   * Sets plot range (min, max)
   *
   */
  private plotRangeSubscription() {
    this.itemChartService.plotRange$.subscribe((value) => {
      this.updateMinMaxOfCharts(value?.start?.getTime(), value?.end?.getTime());
    });
  }

  private comparisonSubscription() {
    this.comparisonChartService.selectedPlot$.subscribe((plot) => {
      this.comparisonItemChartOptions.resetChartOptions();
      if (!plot) {
        this.comparisonChart = null;
        return;
      } else {
        this.comparisonItemChartOptions.setChartsOptions(this.prepareChartOptions(plot.chartLines, plot.startDate, plot.endDate));
      }
      this.updateComparisonChartFlag = true;
      this.updateComparisonScatterChartFlag = true
    });
  }

  private prepareChartOptions(plot: ChartLine, startDate?: Date, endDate?: Date) {
    const chartOptions = {
      overallChart: null,
      threadsPerThreadGroup: null,
      scatterChartOptions: null,
      statusChartOptions: null,
    }
    if (plot) {
      if(plot.overall) {
        const overallChartSeries = Array.from(plot.overall?.values());
        if (plot.threadsPerThreadGroup.has(Metrics.Threads)) {
          chartOptions.threadsPerThreadGroup = plot.threadsPerThreadGroup.get(Metrics.Threads);
        }

        chartOptions.overallChart = {
          ...overallChartSettings("ms"),
          series: JSON.parse(JSON.stringify(overallChartSeries))
        };
      }

      const scatterResponseTimeData = plot.scatter.get(Metrics.ResponseTimeRaw);
      if (scatterResponseTimeData) {
        chartOptions.scatterChartOptions = {
          ...scatterChart(),
          series: [{
            data: scatterResponseTimeData, name: "Response Time", marker: {
              radius: 1
            },
          }]
        };
        if (startDate && endDate) {
          chartOptions.scatterChartOptions.xAxis.min = startDate.getTime()
          chartOptions.scatterChartOptions.xAxis.max = endDate.getTime()
        }


      }

      if (plot?.statusCodes?.has(Metrics.StatusCodeInTime)) {
        // initialize the chart options only when there are the status codes data
        chartOptions.statusChartOptions = {
          ...commonGraphSettings("")
        };
        const statusCodesLines = plot?.statusCodes.get(Metrics.StatusCodeInTime);
        chartOptions.statusChartOptions.series = JSON.parse(JSON.stringify(statusCodesLines.data));
      }
    }

    return chartOptions;
  }

  private updateMinMaxOfCharts(min, max) {
    if (min && max) {
      this.plotRangeMin = min;
      this.plotRangeMax = max;
      for (const chartOptions of [this.overallChartOptions, this.scatterChartOptions, this.statusChartOptions]) {
        chartOptions.xAxis.min = min;
        chartOptions.xAxis.max = max;
      }
      this.updateScatterChartFlag = true;
      this.updateChartFlag = true;
      this.updateOverallChartFlag = true;
    }
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

  showValidationWarning(itemData: ItemDetail): { zeroErrorToleranceValidation: boolean, minTestDurationValidation: boolean } {
    if (itemData.zeroErrorToleranceEnabled || itemData.minTestDuration > 0) {
      return getValidationResults(
        itemData.zeroErrorToleranceEnabled,
        itemData.overview.errorRate,
        itemData.overview.errorCount,
        itemData.overview.duration,
        itemData.minTestDuration
      );
    }
    return {
      zeroErrorToleranceValidation: false,
      minTestDurationValidation: false,
    };
  }

  chartCallback: Highcharts.ChartCallbackFunction = function (chart): void {
    setTimeout(() => {
      chart.reflow();
    }, 0);
    this.chart = chart;
  };

  displayThreadsPerGroupChange(event) {
    const enabled = event.target.checked;
    if (this.overallChart) {
      this.overallChart.destroy();
      this.componentRef.chart = null;
    }

    if (enabled) {
      this.overallChartOptions = commonGraphSettings("");
      this.overallChartOptions.series = this.threadsPerThreadGroup;
    } else {
      const originalSeries = Array.from(this.chartLines?.overall?.values());
      this.overallChartOptions = overallChartSettings("");
      this.overallChartOptions.series = originalSeries;
    }

    // we need always to set the correct zoom range
    this.overallChartOptions.xAxis.min = this.plotRangeMin;
    this.overallChartOptions.xAxis.max = this.plotRangeMax;

    this.updateOverallChartFlag = true;
  }
}
