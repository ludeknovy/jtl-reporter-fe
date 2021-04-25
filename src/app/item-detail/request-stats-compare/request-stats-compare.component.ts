import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ItemsApiService } from 'src/app/items-api.service';
import { ItemParams } from 'src/app/scenario/item-controls/item-controls.model';
import { bytesToMbps, roundNumberTwoDecimals } from '../calculations';

@Component({
  selector: 'app-request-stats-compare',
  templateUrl: './request-stats-compare.component.html',
  styleUrls: ['./request-stats-compare.component.css', '../item-detail.component.scss']
})
export class RequestStatsCompareComponent implements OnInit {

  @Input() itemData;
  @Input() isAnonymous: boolean;
  @Input() params: ItemParams;

  comparedData;
  compareMode = false;
  labelsData;
  comparisonWarning = [];
  comparedMetadata;

  constructor(
    private itemsService: ItemsApiService,
    private toastr: ToastrService
    ) {
  }

  ngOnInit() {
    this.labelsData = this.itemData.statistics;
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
          avgResponseTime: (_.avgResponseTime - labelToBeCompared.avgResponseTime),
          minResponseTime: (_.minResponseTime - labelToBeCompared.minResponseTime),
          maxResponseTime: (_.maxResponseTime - labelToBeCompared.maxResponseTime),
          // @ts-ignore
          bytes: ((_.bytes - labelToBeCompared.bytes) / 1024).toFixed(2),
          n0: (_.n0 - labelToBeCompared.n0),
          n5: (_.n5 - labelToBeCompared.n5),
          n9: (_.n9 - labelToBeCompared.n9),
          errorRate: roundNumberTwoDecimals((_.errorRate - labelToBeCompared.errorRate)),
          throughput: roundNumberTwoDecimals((_.throughput - labelToBeCompared.throughput))
        };
      } else {
        this.comparisonWarning.push(`${_.label} label not found`);
        return {
          ..._,
          avgResponseTime: null,
          minResponseTime: null,
          maxResponseTime: null,
          n0: null,
          n5: null,
          n9: null,
          errorRate: null,
          throughput: null,
          bytes: null,
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

  quickBaseComparison(id) {
    this.itemsService.fetchItemDetail(
      this.params.projectName,
      this.params.scenarioName,
      id).subscribe(_ => this.itemToCompare({
        statistics: _.statistics,
        maxVu: _.overview.maxVu,
        environment: _.environment,
        id
      }));
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

  convertBytesToMbps(bytes) {
    return bytesToMbps(bytes);
  }



}
