import { errorLineSettings, networkLineSettings, threadLineSettings, throughputLineSettings } from "../graphs/item-detail";
import { bytesToMbps } from "../item-detail/calculations";
import { Metrics } from "../item-detail/metrics";

export const getChartLines = (plot): ChartLines => {
  const {
    threads, overallTimeResponse,
    overallThroughput, overAllFailRate, overAllNetworkV2,
    responseTime, throughput, networkV2, minResponseTime, maxResponseTime, percentile50, percentile90,
    percentile95, percentile99, statusCodes, errorRate, scatterPlotData, threadsPerThreadGroup,
  } = plot;

  const threadLine = { ...threadLineSettings, data: threads, tooltip: { valueSuffix: "" } };
  const errorLine = { ...errorLineSettings, name: Metrics.ErrorRate, data: overAllFailRate?.data, tooltip: { valueSuffix: " %" } };
  const throughputLine = { ...throughputLineSettings, name: Metrics.Throughput, data: overallThroughput?.data, tooltip: { valueSuffix: " reqs/s" } };

  const chartLines = {
    overall: new Map(),
    threadsPerThreadGroup: new Map(),
    labels: new Map(),
    statusCodes: new Map(),
    scatter: new Map(),
  };

  if (overAllNetworkV2) {
    const networkMbps = overAllNetworkV2.data.map((_) => {
      return [_[0], bytesToMbps(_[1])];
    });
    const networkLine = { ...networkLineSettings, data: networkMbps, tooltip: { valueSuffix: " mbps" } };
    chartLines.overall.set(Metrics.Network, networkLine);
  }

  // not all reports have status code plot data
  if (statusCodes) {
    chartLines.statusCodes.set(Metrics.StatusCodeInTime, { data: statusCodes });
  }

  chartLines.overall.set(Metrics.ResponseTimeAvg, { data: overallTimeResponse?.data, name: Metrics.ResponseTimeAvg, tooltip: { valueSuffix: " ms" } });
  chartLines.overall.set(Metrics.Threads, threadLine);
  chartLines.overall.set(Metrics.ErrorRate, errorLine);
  chartLines.overall.set(Metrics.Throughput, throughputLine);

  if (threadsPerThreadGroup) {
    chartLines.threadsPerThreadGroup.set(Metrics.Threads, threadsPerThreadGroup)
  }

  if (scatterPlotData && scatterPlotData.length > 0) {
    chartLines.scatter.set(Metrics.ResponseTimeRaw, scatterPlotData)
  }

  if (networkV2) {
    const networkMbps = networkV2.map((_) => {
      _.data = _.data.map(__ => [__[0], bytesToMbps(__[1])]);
      return _;
    });

    chartLines.labels.set(Metrics.Network, networkMbps.map((label) => ({ ...label, suffix: " mbps" })));
  }

  if (minResponseTime) {
    chartLines.labels.set(Metrics.ResponseTimeMin, minResponseTime.map((label) => ({ ...label, suffix: " ms" })));
  }

  if (maxResponseTime) {
    chartLines.labels.set(Metrics.ResponseTimeMax, maxResponseTime.map((label) => ({ ...label, suffix: " ms" })));
  }
  if(percentile50) {
    chartLines.labels.set(Metrics.ResponseTimeP50, percentile50.map((label) => ({ ...label, suffix: " ms" })))
  }
  if (percentile90) {
    chartLines.labels.set(Metrics.ResponseTimeP90, percentile90.map((label) => ({ ...label, suffix: " ms" })));
  }
  if (percentile95) {
    chartLines.labels.set(Metrics.ResponseTimeP95, percentile95.map((label) => ({ ...label, suffix: " ms" })));
  }
  if (percentile99) {
    chartLines.labels.set(Metrics.ResponseTimeP99, percentile99.map((label) => ({ ...label, suffix: " ms" })));
  }
  if (errorRate) {
    chartLines.labels.set(Metrics.ErrorRate, errorRate.map((label) => ({ ...label, suffix: " %" })));
  }
  chartLines.labels.set(Metrics.ResponseTimeAvg, responseTime.map((label) => ({ ...label, suffix: " ms" })));
  chartLines.labels.set(Metrics.Throughput, throughput.map((label) => ({ ...label, suffix: " reqs/s" })));

  return { chartLines };

};


export interface ChartLines {
  chartLines: ChartLine;
}

export interface ChartLine {
  labels: Map<string, LabelChartLine[]>;
  overall: Map<string, { name: string, data: [] }>;
  scatter: Map<string,[] >
}

export interface LabelChartLine {
  name: string
  data: [],
  suffix: string
}
