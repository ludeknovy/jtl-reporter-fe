import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsApiService } from '../items-api.service';
import { ItemDetail } from '../items.service.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecimalPipe } from '@angular/common';
import * as Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';

exporting(Highcharts);

import {
  threadLineSettings,
  errorLineSettings, overallChartSettings,
  throughputLineSettings,
  networkLineSettings,
  commonGraphSettings,
} from '../graphs/item-detail';
import { catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { SharedMainBarService } from '../shared-main-bar.service';
import { ToastrService } from 'ngx-toastr';
import { ItemStatusValue } from './item-detail.model';
import { bytesToMbps, roundNumberTwoDecimals } from './calculations';
import { logScaleButton } from '../graphs/log-scale-button';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss', '../shared-styles.css'],
  providers: [DecimalPipe]
})
export class ItemDetailComponent implements OnInit {
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
    testName: null,
    attachements: [],
    monitoringData: { mem: [], maxCpu: 0, maxMem: 0, cpu: [] },
    analysisEnabled: null,
  };
  overallChartOptions;
  updateChartFlag = false;
  monitoringChart;
  itemParams;
  hasErrorsAttachment;
  comparedData;
  comparedMetadata;
  labelsData;
  Math: any;
  comparisonWarning = [];
  token: string;
  isAnonymous = false;
  toggleThroughputBandFlag = false;
  chartLines = {
    overall: new Map(),
    labels: new Map(),
  };
  labelCharts = new Map();

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsApiService,
    private spinner: NgxSpinnerService,
    private sharedMainBarService: SharedMainBarService,
    private toastr: ToastrService
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
        this.labelsData = this.itemData.statistics;
        this.hasErrorsAttachment = this.itemData.attachements.find((_) => _ === 'error');
        this.monitoringAlerts();
        this.generateCharts();
        this.spinner.hide();
      });
  }

  private getChartLines() {
    const { threads, overallTimeResponse,
      overallThroughput, overAllFailRate, overallNetwork,
      responseTime, throughput, network, minResponseTime, maxResponseTime, percentile90,
      percentile95, percentile99,
    } = this.itemData.plot;

    const threadLine = { ...threadLineSettings, name: 'virtual users', data: threads };
    const errorLine = { ...errorLineSettings, ...overAllFailRate };
    const throughputLine = { ...throughputLineSettings, ...overallThroughput };

    if (overallNetwork) {
      const networkMbps = overallNetwork.data.map((_) => {
        return [_[0], bytesToMbps(_[1])];
      });
      const networkLine = { ...networkLineSettings, data: networkMbps };
      this.chartLines.overall.set('Network', networkLine);
    }

    this.chartLines.overall.set('Response Time [avg]', overallTimeResponse);
    this.chartLines.overall.set('Threads', threadLine);
    this.chartLines.overall.set('Error rate', errorLine);
    this.chartLines.overall.set('Throughput', throughputLine);

    if (network) {
      const networkMbps = network.map((_) => {
        _.data = _.data.map(__ => [__[0], bytesToMbps(__[1])]);
        return _;
      });
      const networkChartOptions = {
        ...commonGraphSettings('mbps'),
        series: [...networkMbps, ...threadLine], ...logScaleButton
      };
      this.chartLines.labels.set('Network', networkMbps);
      this.labelCharts.set('Network', networkChartOptions);
    }

    if (minResponseTime) {
      this.chartLines.labels.set('Response Time [min]', minResponseTime);
      this.labelCharts.set('Response Time [min]', { ...commonGraphSettings('ms'), series: [...minResponseTime, ...threadLine]});
    }
    if (maxResponseTime) {
      this.chartLines.labels.set('Response Time [max]', maxResponseTime);
      this.labelCharts.set('Response Time [max]', { ...commonGraphSettings('ms'), series: [...maxResponseTime, ...threadLine]});
    }
    if (percentile90) {
      this.chartLines.labels.set('Response Time [P90]', percentile90);
      this.labelCharts.set('Response Time [P90]', { ...commonGraphSettings('ms'), series: [...percentile90, ...threadLine]});
    }
    if (percentile95) {
      this.chartLines.labels.set('Response Time [P90]', percentile90);
      this.labelCharts.set('Response Time [P90]', { ...commonGraphSettings('ms'), series: [...percentile95, ...threadLine]});
    }
    if (percentile99) {
      this.chartLines.labels.set('Response Time [P90]', percentile90);
      this.labelCharts.set('Response Time [P90]', { ...commonGraphSettings('ms'), series: [...percentile99, ...threadLine]});
    }

    this.chartLines.labels.set('Response Time [avg]', responseTime);
    this.labelCharts.set('Response Time [avg]', { ...commonGraphSettings('ms'), series: [...responseTime, ...threadLine]});


    this.chartLines.labels.set('Throughput', throughput);
    this.labelCharts.set('Throughput', { ...commonGraphSettings('hits/s'), series: [...throughput, ...threadLine]});


  }

  private generateCharts() {
    this.getChartLines();
    const oveallChartSeries = Array.from(this.chartLines.overall.values());

    this.overallChartOptions = {
      ...overallChartSettings('ms'), series: oveallChartSeries
    };
  }

  itemDetailChanged({ note, environment, hostname }) {
    this.itemData.note = note;
    this.itemData.environment = environment;
    this.itemData.hostname = hostname;
  }

  itemToCompare(data) {
    this.comparedMetadata = { id: data.id, maxVu: data.maxVu };
    if (data.maxVu !== this.itemData.overview.maxVu) {
      this.comparisonWarning.push(`VU do differ ${this.itemData.overview.maxVu} vs. ${data.maxVu}`);
    }

    this.comparedData = this.labelsData.map((_) => {
      const labelToBeCompared = data.statistics.find((__) => __.label === _.label);
      if (labelToBeCompared) {
        return {
          ..._,
          avgDiff: (_.avgResponseTime - labelToBeCompared.avgResponseTime),
          minDiff: (_.minResponseTime - labelToBeCompared.minResponseTime),
          maxDiff: (_.maxResponseTime - labelToBeCompared.maxResponseTime),
          // @ts-ignore
          bytesDiff: ((_.bytes - labelToBeCompared.bytes) / 1024).toFixed(2),
          n0Diff: (_.n0 - labelToBeCompared.n0),
          n5Diff: (_.n5 - labelToBeCompared.n5),
          n9Diff: (_.n9 - labelToBeCompared.n9),
          errorRateDiff: roundNumberTwoDecimals((_.errorRate - labelToBeCompared.errorRate)),
          throughputDiff: roundNumberTwoDecimals((_.throughput - labelToBeCompared.throughput))
        };
      } else {
        this.comparisonWarning.push(`${_.label} label not found`);
        return {
          ..._,
          avgDiff: null,
          minDiff: null,
          maxDiff: null,
          n0Diff: null,
          n5Diff: null,
          n9Diff: null,
          errorRateDiff: null,
          throughputDiff: null
        };
      }
    });
    if (data.environment !== this.itemData.environment) {
      this.comparisonWarning.push('Environments do differ');
    }
    this.labelsData = this.comparedData;

    if (this.comparisonWarning.length) {
      this.showComparisonWarnings();
    }
  }

  showComparisonWarnings() {
    this.toastr.warning(this.comparisonWarning.join('<br>'), 'Comparison Warning!',
      {
        closeButton: true,
        enableHtml: true,
        timeOut: 15000,
        positionClass: 'toast-bottom-right'
      });
    this.comparisonWarning = [];
  }

  monitoringAlerts() {
    const alertMessages = [];
    const { maxCpu, maxMem } = this.itemData.monitoringData;
    if (maxCpu > 90) {
      alertMessages.push(`High CPU usage`);
    }
    if (maxMem > 90) {
      alertMessages.push(`High memory usage`);
    }

    if (alertMessages.length > 0) {
      this.toastr.warning(alertMessages.join('<br>'), 'Monitoring Alert!',
        {
          closeButton: true,
          disableTimeOut: true,
          enableHtml: true,
        });
    }

  }

  resetStatsData() {
    this.comparedData = null;
    this.labelsData = this.itemData.statistics;
  }

  search(term: string) {
    const dataToFilter = this.comparedData || this.itemData.statistics;
    if (term) {
      this.labelsData = dataToFilter.filter(x =>
        x.label.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    } else {
      this.labelsData = dataToFilter;
    }
  }

  getTextStatus(status) {
    for (const k in ItemStatusValue) {
      if (ItemStatusValue[k] === status) {
        return k;
      }
    }
  }

  quickBaseComparison(id) {
    this.itemsService.fetchItemDetail(
      this.itemParams.projectName,
      this.itemParams.scenarioName,
      id).subscribe(_ => this.itemToCompare({
        statistics: _.statistics,
        maxVu: _.overview.maxVu,
        environment: _.environment,
        id
      }));
  }

  toggleThroughputBand({ element, perfAnalysis }) {
    this.overallChartOptions.series.forEach(serie => {
      if (['response time', 'errors'].includes(serie.name)) {
        serie.visible = this.toggleThroughputBandFlag;
      }
      if (serie.name === 'throughput') {
        if (this.toggleThroughputBandFlag) {
          serie.zones = [];
          return;
        }
        serie.zones = [{
          value: this.itemData.overview.throughput,
          color: '#e74c3c'
        }];
      }
    });

    if (!this.toggleThroughputBandFlag) {
      element.textContent = 'Hide in chart';
      this.overallChartOptions.xAxis.plotBands = {
        color: '#e74c3c4f',
        from: perfAnalysis.throughputVariability.bandValues[0],
        to: perfAnalysis.throughputVariability.bandValues[1]
      };
      this.toggleThroughputBandFlag = true;
    } else {
      element.textContent = 'Display in chart';
      this.overallChartOptions.xAxis.plotBands = null;
      this.toggleThroughputBandFlag = false;
    }
    this.updateChartFlag = true;
  }

  convertBytesToMbps(bytes) {
    return bytesToMbps(bytes);
  }
}
