import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemsApiService } from "../items-api.service";
import { ItemDetail } from "../items.service.model";
import { NgxSpinnerService } from "ngx-spinner";
import { DecimalPipe } from "@angular/common";
import * as Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";

exporting(Highcharts);

import {
  threadLineSettings,
  errorLineSettings, overallChartSettings,
  throughputLineSettings,
  networkLineSettings,
  commonGraphSettings,
} from "../graphs/item-detail";
import { catchError, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";
import { SharedMainBarService } from "../shared-main-bar.service";
import { ToastrService } from "ngx-toastr";
import { bytesToMbps } from "./calculations";
import { logScaleButton } from "../graphs/log-scale-button";
import { ItemStatusValue } from "./item-detail.model";
import { Metrics } from "./metrics";
import { AnalyzeChartService } from "../analyze-chart.service";
import { showZeroErrorWarning } from "../utils/showZeroErrorTolerance";

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
    reportStatus: null,
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
    topMetricsSettings: null
  };
  overallChartOptions;
  updateChartFlag = false;
  monitoringChart;
  itemParams;
  hasErrorsAttachment;
  Math: any;
  token: string;
  isAnonymous = false;
  toggleThroughputBandFlag = false;
  chartLines = {
    overall: new Map(),
    labels: new Map(),
  };
  labelCharts = new Map();
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
    private analyzeChartService: AnalyzeChartService
  ) {
    this.Math = Math;
  }


  async ngOnInit() {
    this.spinner.show();
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
        this.generateCharts();
        this.calculateTotalRequests();
        this.spinner.hide();
      });
    this.analyzeChartService.currentData.subscribe(data => {
      if (data) {
        this.activeId = 2;
      }
    });
  }

  ngOnDestroy() {
    this.toastr.clear();
  }

  private calculateTotalRequests() {
    this.totalRequests = this.itemData.statistics.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.samples;
    }, 0);
  }

  private getChartLines() {
    const {
      threads, overallTimeResponse,
      overallThroughput, overAllFailRate, overAllNetworkV2,
      responseTime, throughput, networkV2, minResponseTime, maxResponseTime, percentile90,
      percentile95, percentile99,
    } = this.itemData.plot;

    const threadLine = { ...threadLineSettings, name: "virtual users", data: threads, tooltip: { valueSuffix: "" } };
    const errorLine = { ...errorLineSettings, ...overAllFailRate, tooltip: { valueSuffix: " %" } };
    const throughputLine = { ...throughputLineSettings, ...overallThroughput, tooltip: { valueSuffix: " hits/s" } };

    if (overAllNetworkV2) {
      const networkMbps = overAllNetworkV2.data.map((_) => {
        return [_[0], bytesToMbps(_[1])];
      });
      const networkLine = { ...networkLineSettings, data: networkMbps, tooltip: { valueSuffix: " mbps" } };
      this.chartLines.overall.set(Metrics.Network, networkLine);
    }

    this.chartLines.overall.set(Metrics.ResponseTimeAvg, overallTimeResponse);
    this.chartLines.overall.set(Metrics.Threads, threadLine);
    this.chartLines.overall.set(Metrics.ErrorRate, errorLine);
    this.chartLines.overall.set(Metrics.Throughput, throughputLine);

    if (networkV2) {
      const networkMbps = networkV2.map((_) => {
        _.data = _.data.map(__ => [__[0], bytesToMbps(__[1])]);
        return _;
      });
      const networkChartOptions = {
        ...commonGraphSettings("mbps"),
        series: [...networkMbps, threadLine], ...logScaleButton
      };

      this.chartLines.labels.set(Metrics.Network, networkMbps);
      this.labelCharts.set(Metrics.Network, networkChartOptions);
    }

    if (minResponseTime) {
      this.chartLines.labels.set(Metrics.ResponseTimeMin, minResponseTime);
      this.labelCharts.set(Metrics.ResponseTimeMin, { ...commonGraphSettings("ms"), series: [...minResponseTime, threadLine] });
    }

    if (maxResponseTime) {
      this.chartLines.labels.set(Metrics.ResponseTimeMax, maxResponseTime);
      this.labelCharts.set(Metrics.ResponseTimeMax, { ...commonGraphSettings("ms"), series: [...maxResponseTime, threadLine] });
    }
    if (percentile90) {
      this.chartLines.labels.set(Metrics.ResponseTimeP90, percentile90);
      this.labelCharts.set(Metrics.ResponseTimeP90, { ...commonGraphSettings("ms"), series: [...percentile90, threadLine] });
    }
    if (percentile95) {
      this.chartLines.labels.set(Metrics.ResponseTimeP95, percentile95);
      this.labelCharts.set(Metrics.ResponseTimeP95, { ...commonGraphSettings("ms"), series: [...percentile95, threadLine] });
    }
    if (percentile99) {
      this.chartLines.labels.set(Metrics.ResponseTimeP99, percentile99);
      this.labelCharts.set(Metrics.ResponseTimeP99, { ...commonGraphSettings("ms"), series: [...percentile99, threadLine] });
    }

    this.chartLines.labels.set(Metrics.ResponseTimeAvg, responseTime);
    this.labelCharts.set(Metrics.ResponseTimeAvg, { ...commonGraphSettings("ms"), series: [...responseTime, threadLine] });


    this.chartLines.labels.set(Metrics.Throughput, throughput);
    this.labelCharts.set(Metrics.Throughput, { ...commonGraphSettings("hits/s"), series: [...throughput, threadLine] });

  }

  private generateCharts() {
    this.getChartLines();
    const oveallChartSeries = Array.from(this.chartLines.overall.values());

    this.overallChartOptions = {
      ...overallChartSettings("ms"), series: oveallChartSeries
    };
  }

  itemDetailChanged({ note, environment, hostname, name }) {
    this.itemData.note = note;
    this.itemData.environment = environment;
    this.itemData.hostname = hostname;
    this.itemData.name = name
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
    this.overallChartOptions.series.forEach(serie => {
      if (["response time", "errors"].includes(serie.name)) {
        serie.visible = this.toggleThroughputBandFlag;
      }
      if (serie.name === "throughput") {
        if (this.toggleThroughputBandFlag) {
          serie.zones = [];
          return;
        }
        serie.zones = [{
          value: this.itemData.overview.throughput,
          color: "#e74c3c"
        }];
      }
    });

    if (!this.toggleThroughputBandFlag) {
      element.textContent = "Hide in chart";
      this.overallChartOptions.xAxis.plotBands = {
        color: "#e74c3c4f",
        from: perfAnalysis.throughputVariability.bandValues[0],
        to: perfAnalysis.throughputVariability.bandValues[1]
      };
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
    },0);
}
}
