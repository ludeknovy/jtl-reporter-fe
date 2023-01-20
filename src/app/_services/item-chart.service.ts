import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { commonGraphSettings, errorLineSettings, networkLineSettings, threadLineSettings, throughputLineSettings } from "../graphs/item-detail";
import { logScaleButton } from "../graphs/log-scale-button";
import { bytesToMbps } from "../item-detail/calculations";
import { Metrics } from "../item-detail/metrics";
import {statusCodesChart} from '../graphs/status-codes';

@Injectable({
  providedIn: "root"
})
export class ItemChartService {

  private plot$ = new BehaviorSubject<ChartLines>({ labelCharts: new Map(), chartLines: null });
  selectedPlot$ = this.plot$.asObservable();

  setCurrentPlot(plot) {
    this.plot$.next(this.getChartLines(plot));
  }


  private getChartLines(plot): ChartLines {
    const {
      threads, overallTimeResponse,
      overallThroughput, overAllFailRate, overAllNetworkV2,
      responseTime, throughput, networkV2, minResponseTime, maxResponseTime, percentile90,
      percentile95, percentile99, statusCodes
    } = plot;

    const threadLine = { ...threadLineSettings, name: "virtual users", data: threads, tooltip: { valueSuffix: "" } };
    const errorLine = { ...errorLineSettings, ...overAllFailRate, tooltip: { valueSuffix: " %" } };
    const throughputLine = { ...throughputLineSettings, ...overallThroughput, tooltip: { valueSuffix: " reqs/s" } };

    const chartLines = {
      overall: new Map(),
      labels: new Map(),
      statusCodes: new Map()
     }
     // full chart configs
    const labelCharts = new Map()

    if (overAllNetworkV2) {
      const networkMbps = overAllNetworkV2.data.map((_) => {
        return [_[0], bytesToMbps(_[1])];
      });
      const networkLine = { ...networkLineSettings, data: networkMbps, tooltip: { valueSuffix: " mbps" } };
      chartLines.overall.set(Metrics.Network, networkLine);
    }

    // not all reports have status code plot data
    if (statusCodes) {
      chartLines.statusCodes.set(Metrics.StatusCodeInTime, { data: statusCodes })
    }

    chartLines.overall.set(Metrics.ResponseTimeAvg, { ...overallTimeResponse, tooltip: { valueSuffix: " ms" } });
    chartLines.overall.set(Metrics.Threads, threadLine);
    chartLines.overall.set(Metrics.ErrorRate, errorLine);
    chartLines.overall.set(Metrics.Throughput, throughputLine);

    if (networkV2) {
      const networkMbps = networkV2.map((_) => {
        _.data = _.data.map(__ => [__[0], bytesToMbps(__[1])]);
        return _;
      });
      const networkChartOptions = {
        ...commonGraphSettings("mbps"),
        series: [...networkMbps, threadLine], ...logScaleButton
      };

      chartLines.labels.set(Metrics.Network, networkMbps.map((label) => ({ ...label, suffix: " mbps" })));
      labelCharts.set(Metrics.Network, networkChartOptions);
    }

    if (minResponseTime) {
      chartLines.labels.set(Metrics.ResponseTimeMin, minResponseTime.map((label) => ({ ...label,  suffix: " ms" })));
      labelCharts.set(Metrics.ResponseTimeMin, { ...commonGraphSettings("ms"), series: [...minResponseTime, threadLine] });
    }

    if (maxResponseTime) {
      chartLines.labels.set(Metrics.ResponseTimeMax, maxResponseTime.map((label) => ({ ...label,  suffix: " ms" })));
      labelCharts.set(Metrics.ResponseTimeMax, { ...commonGraphSettings("ms"), series: [...maxResponseTime, threadLine] });
    }
    if (percentile90) {
      chartLines.labels.set(Metrics.ResponseTimeP90, percentile90.map((label) => ({ ...label,  suffix: " ms" })));
      labelCharts.set(Metrics.ResponseTimeP90, { ...commonGraphSettings("ms"), series: [...percentile90, threadLine] });
    }
    if (percentile95) {
      chartLines.labels.set(Metrics.ResponseTimeP95, percentile95.map((label) => ({ ...label,  suffix: " ms" })));
      labelCharts.set(Metrics.ResponseTimeP95, { ...commonGraphSettings("ms"), series: [...percentile95, threadLine] });
    }
    if (percentile99) {
      chartLines.labels.set(Metrics.ResponseTimeP99, percentile99.map((label) => ({ ...label,  suffix: " ms" })));
      labelCharts.set(Metrics.ResponseTimeP99, { ...commonGraphSettings("ms"), series: [...percentile99, threadLine] });
    }

    chartLines.labels.set(Metrics.ResponseTimeAvg, responseTime.map((label) => ({ ...label,  suffix: " ms" })));
    labelCharts.set(Metrics.ResponseTimeAvg, { ...commonGraphSettings("ms"), series: [...responseTime, threadLine] });


    chartLines.labels.set(Metrics.Throughput,  throughput.map((label) => ({ ...label,  suffix: " reqs/s" })));
    labelCharts.set(Metrics.Throughput, { ...commonGraphSettings("reqs/s"), series: [...throughput, threadLine] });


    return { labelCharts, chartLines }

  }


}


interface ChartLines {
  labelCharts: Map<string, object>,
  chartLines: ChartLine
}

export interface ChartLine {
  labels: Map<string, LabelChartLine[]>
  overall: Map<string, { name: string, data: [] }>
}

export interface LabelChartLine {
  name: string
  data: [],
  suffix: string
}
