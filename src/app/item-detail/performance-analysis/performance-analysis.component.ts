import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-performance-analysis',
  templateUrl: './performance-analysis.component.html',
  styleUrls: ['./performance-analysis.component.css', '../item-detail.component.scss'],
    animations : [
    trigger('panelState', [
      state('closed', style({ height: 0, overflow: 'hidden' })),
      state('open', style({ height: '*' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class PerformanceAnalysisComponent implements OnInit {

  @Input() itemData;
  @Output() overallChartChange = new EventEmitter<{}>();


  perfAnalysis = {
    variability: null, onePerc: null, throughputVariability: {
      failed: null,
      value: null,
      bandValues: null,
    }
  };
  folded = 'closed';
  foldedBottom = 'closed';
  Math: any;

  constructor() {
    this.Math = Math;

   }

  ngOnInit() {
    this.performanceAnalaysis();
  }

  private performanceAnalaysis() {
    if (!this.itemData.analysisEnabled) {
      return;
    }
    const output = [];
    this.itemData.statistics.forEach(_ => {
      const variability = this.roundNumberTwoDecimals(_.avgResponseTime / _.minResponseTime);
      const onePerc = this.roundNumberTwoDecimals(_.n9 / _.avgResponseTime);
      output.push({
        variability,
        onePerc,
        minResponseTime: _.minResponseTime,
        avgResponseTime: _.avgResponseTime,
        p99: _.n9,
        label: _.label
      });
    });

    const variabilitySorted = [...output].sort((a, b) =>  b.variability - a.variability);
    const onePercSorted = [...output].sort((a, b) => b.onePerc - a.onePerc);

    this.perfAnalysis = {
      variability: {
        value: variabilitySorted[0].variability,
        avgResponseTime: variabilitySorted[0].avgResponseTime,
        minResponseTime: variabilitySorted[0].minResponseTime,
        failed: variabilitySorted[0].variability > 2.5,
        failingLabels: variabilitySorted.filter(_ => _.variability > 2.5)
      },
      onePerc: {
        value: onePercSorted[0].onePerc,
        avgResponseTime: onePercSorted[0].onePerc.avgResponseTime,
        failed: onePercSorted[0].onePerc > 2.5,
        failingLabels: onePercSorted.filter(_ => _.onePerc > 2.5)
      },
      throughputVariability: this.calculateThroughputVariability()
    };
  }

  private calculateThroughputVariability() {
    try {
      const { overallThroughput, threads } = this.itemData.plot;
      const { maxVu, throughput } = this.itemData.overview;
      const rampUpIndex = threads.map(_ => _[1]).indexOf(maxVu);

      const throughputValues = overallThroughput.data.slice(rampUpIndex, -2).map(_ => _[1]);
      const minThroughput = Math.min(...throughputValues);
      const minThroughputIndex = throughputValues.indexOf(minThroughput);
      const maxBandIndex = throughputValues.length;
      const bandTo = minThroughputIndex + 5 <= maxBandIndex ? minThroughputIndex + 3 : maxBandIndex;
      const throughputBandValues = [
        overallThroughput.data.slice(rampUpIndex)[minThroughputIndex - 3][0],
        overallThroughput.data.slice(rampUpIndex)[bandTo][0]
      ];
      const throughputVariability = this.roundNumberTwoDecimals(100 - (minThroughput / throughput) * 100);

      return {
        value: throughputVariability,
        failed: throughputVariability > 20,
        bandValues: throughputBandValues
      };
    } catch (error) {
      return {
        value: null,
        failed: false,
        bandValues: []
      };
    }

  }

  private roundNumberTwoDecimals = number => {
    return Math.round(number * 100) / 100;
  }

  toggleFoldRT(element) {
    if (this.folded === 'open') {
      this.folded = 'closed';
      element.textContent = 'Show more';
      return;
    }
    this.folded = 'open';
    element.textContent = 'Show less';
  }

  toggleFoldBottom(element) {
    if (this.foldedBottom === 'open') {
      this.foldedBottom = 'closed';
      element.textContent = 'Show more';
      return;
    }
    this.foldedBottom = 'open';
    element.textContent = 'Show less';
  }

  toggleThroughputBand(element) {
    this.overallChartChange.emit({ element, perfAnalysis: this.perfAnalysis });

  }


}
