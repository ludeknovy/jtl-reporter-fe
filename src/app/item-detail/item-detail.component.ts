import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsApiService } from '../items-api.service';
import { ItemDetail } from '../items.service.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecimalPipe } from '@angular/common';
import * as Highcharts from 'highcharts';

import {
  commonGraphSettings, threadLineSettings,
  errorLineSettings, threeAxisGraphSettings,
  throughputLineSettings
} from '../graphs/item-detail';
import { catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { SharedMainBarService } from '../shared-main-bar.service';
import { ToastrService } from 'ngx-toastr';
import { ItemStatusValue } from './item-detail.model';

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
    hostname: null,
    statistics: [],
    testName: null,
    attachements: [],
    monitoringData: { mem: [], cpu: [] },
  };
  responseTimeChartOptions;
  throughputChartOptions;
  overallChartOptions;
  overallResponseTimeChart;
  monitoringChart;
  overallThroughput;
  itemParams;
  hasErrorsAttachment;
  comparedData;
  comparedMetadata;
  labelsData;
  Math: any;
  comparisonWarning = [];

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
    this.itemsService.fetchItemDetail(
      this.itemParams.projectName,
      this.itemParams.scenarioName,
      this.itemParams.id)
      .pipe(catchError(r => of(r)))
      .subscribe((results) => {
        this.itemData = results;
        this.labelsData = this.itemData.statistics;
        this.hasErrorsAttachment = this.itemData.attachements.find((_) => _ === 'error')
        this.generateCharts();
        this.spinner.hide();
      });
  }

  private generateCharts() {
    const { responseTime, throughput, threads, overallTimeResponse, overallThroughput, overAllFailRate } = this.itemData.plot;
    const threadLine = { ...threadLineSettings, name: 'th', data: threads };
    const errorLine = { ...errorLineSettings, ...overAllFailRate };
    const throughputLine = { ...throughputLineSettings, ...overallThroughput };
    this.responseTimeChartOptions = { ...commonGraphSettings('ms'), series: [...responseTime, ...threadLine] };
    this.throughputChartOptions = { ...commonGraphSettings('hits/s'), series: [...throughput, ...threadLine] };
    this.overallChartOptions = {
      ...threeAxisGraphSettings('ms', 'hits/s'), series: [
        overallTimeResponse, throughputLine, ...errorLine, ...threadLine]
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
          errorRateDiff: this.roundNumberTwoDecimals((_.errorRate - labelToBeCompared.errorRate)),
          throughputDiff: this.roundNumberTwoDecimals((_.throughput - labelToBeCompared.throughput))
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
      this.showWarnings();
    }
  }

  showWarnings() {
    this.toastr.warning(this.comparisonWarning.join('<br>'), 'Comparison Warning!',
      {
        closeButton: true,
        enableHtml: true,
        timeOut: 15000
      });
    this.comparisonWarning = [];
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

  private roundNumberTwoDecimals = number => {
    return Math.round(number * 100) / 100;
  }
}
