import { RequestStats } from "./scenario.service.model";

export interface ItemsListing {
  id: string;
  name: string;
  projectName: string;
  environment: string;
  status: string;
  zeroErrorToleranceEnabled: boolean;
  minTestDuration: number,
  thresholdPassed?: boolean;
  overview: ItemOverview;

}

export interface Items {
  name: string;
  data: ItemsListing[];
  total: number;
}

export enum ReportStatus {
  InProgress = "in_progress",
  Error = "error",
  Ready = "ready"
}

export interface ItemDetail {
  overview: ItemOverview;
  analysisEnabled: boolean;
  zeroErrorToleranceEnabled: boolean;
  reportStatus: ReportStatus;
  monitoring: {
    cpu: { data: { name: string, cpu: number, timestamp: number }[], max?: number }
  };
  baseId: string;
  name: string;
  note: string;
  resourcesLink?: string;
  hostname: string;
  environment: string;
  plot: ItemDataPlot;
  extraPlotData: ItemExtraPlot[];
  histogramPlotData?: {
    responseTimePerLabelDistribution?: ResponseTimePerLabelDistribution[]
  };
  statistics: ItemStatistics[];
  thresholds?: {
    passed: boolean,
    results: Array<{
      label: string
      passed: string
      result: ThresholdResult
    }>
    diff: {
      errorRateDiff: number,
      percentileRateDiff: number,
      throughputRateDiff: number
    }
  };
  topMetricsSettings: TopMetricsSettings;
  userSettings: {
    requestStats: RequestStats
  };
  errorSummary: ErrorSummary
  status: string
  minTestDuration: number
}

interface TopMetricsSettings {
  errorRate: boolean;
  virtualUsers: boolean;
  throughput: boolean;
  network: boolean;
  avgResponseTime: boolean;
  avgConnectionTime: boolean;
  avgLatency: boolean;
  percentile: boolean;
}

interface ItemOverview {
  avgLatency: number;
  avgConnect: number;
  avgResponseTime: number;
  duration: number;
  endDate: string;
  errorRate: number;
  maxVu: number;
  percentil: number;
  startDate: string;
  throughput: number;
  errorCount?: number;
}

interface ItemOverview {
  avgLatency: number;
  avgResponseTime: number;
  duration: number;
  endDate: string;
  errorRate: number;
  maxVu: number;
  percentil: number;
  startDate: string;
  throughput: number;
  errorCount?: number;
}

export interface ItemDataPlot {
  responseTime: LabelSeries[];
  minResponseTime: LabelSeries[];
  maxResponseTime: LabelSeries[];
  throughput: LabelSeries[];
  networkV2: LabelSeries[];
  networkUp: LabelSeries[];
  networkDown: LabelSeries[];
  percentile50?: LabelSeries[];
  percentile90?: LabelSeries[];
  percentile95?: LabelSeries[];
  percentile99?: LabelSeries[];
  overAllNetworkV2: any;
  overallNetworkUp: any;
  overallNetworkDown: any;
  overallTimeResponse: any;
  overallThroughput: any;
  overAllFailRate: any;
  threads: any;
}

export interface ItemExtraPlot {
  interval: string;
  data: ItemDataPlot;
}

interface LabelSeries {
  name: string;
  data: any[];
}

export interface ItemStatistics {
  avgResponseTime: number;
  bytes: number;
  errorRate: number;
  label: string;
  maxResponseTime: number;
  minResponseTime: number;
  n0: number;
  n5: number;
  n9: number;
  samples: number;
  throughput: number;
  responseMessageFailures?: ResponseMessageFailure[];
  apdex: {
    satisfaction?: number
    toleration?: number
  };
}

interface ResponseMessageFailure {
  count: number;
  responseMessage: string;
}

interface MonitoringData {
  "bytes-recv"?: string;
  "bytes-sent"?: string;
  "conn-all"?: string;
  cpu?: string;
  "diskSpace"?: string;
  mem?: string;
  ts?: string;
}

export interface ScenarioTrendsData {
  overview: {
    avgConnect: number;
    avgLatency: number;
    avgResponseTime: number;
    bytesPerSecond: number;
    duration: number;
    endData: Date;
    errorRate: number;
    maxVu: number;
    percentil: number;
    startDate: Date;
    throughput: number;
  };
  id: string;
}

export interface LabelTrendsData {
  labelStats: [{
    avgResponseTime: number
    bytesPerSecond: number
    bytesSentPerSecond: number
    connect: number
    errorRate: number
    label: string
    latency: number
    maxResponseTime: number
    medianResponseTime: number
    minResponseTime: number
    n0: number
    n5: number
    n9: number
    samples: number
    throughput: number
  },]
  id: string,
  startDate: string

}

export interface ItemHistoryDetail {
  label: string;
  samples: number;
  avgResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  errorRate: number;
  throughput: number;
  percentiles: {
    n9: number;
    n5: number;
    n0: number;
  };
}

export interface NoteBodyRequest {
  note: string;
}

export interface ProjectOverview {
  totalTests: number;
  uniqueScenarios: number;
}

export interface IScenarios {
  id: string;
  name: string;
  data: [{
    avgLatency: number
    avgResponseTime: number
    duration: number
    endDate: string
    errorRate: number
    errors: any
    maxVu: number
    percentil: number
    startDate: string
    throughput: number
  }];
}

export interface ItemErrors {
  name: string;
  data: {
    lb: string;
    ts: string;
    responseData: {
      $t: any
    },
    assertionResult: [{
      name: string;
      error: boolean;
      failure: boolean;
      failureMessage: string;
    }]
  };
}

export interface ProjectsOverallStats {
  avgVu: number;
  avgDuration: number;
  totalDuration: number;
  totalRunCount: number;
}

export interface LabelTrend {
  chartSeries: {
    timePoints: string[];
    errorRate: number[];
    id: string;
    p90: number[];
    p95: number[];
    p99: number[];
    throughput: number[];
    virtualUsers: number[];
    avgLatency: number[],
    avgConnectionTime: number[],
    avgResponseTime: number[],
    name: string[],
  },
  chartSettings: {
    virtualUsers: boolean,
    throughput: boolean,
    avgLatency: boolean,
    avgConnectionTime: boolean,
    avgResponseTime: boolean,
    p90: boolean,
    p95: boolean,
    p99: boolean,
    errorRate: boolean,
  }

}

export interface LabelMaxVu {
  result: [{
    maxVu: number;
    count: number;
  }];
}

export interface ScenarioNotifications {
  id: string;
  url: string;
  type: string;
}

export interface UpsertItemChartSettings {
  series: [{
    name: string;
    data: [number, number];
  }];
}

export interface ResponseTimePerLabelDistribution {
  label: string;
  values: number[];
}

export interface ScenarioTrendsUserSettings {
  aggregatedTrends: boolean;
  labelMetrics: {
    errorRate: boolean
    percentile90: boolean
    throughput: boolean
  };
}

export interface ThresholdResult {
  errorRate: {
    diffValue: number,
    passed: boolean
  }
  percentile: {
    diffValue: number,
    passed: boolean
  }
  throughput: {
    diffValue: number,
    passed: boolean
  }
}

export interface ErrorSummary {
  groupedErrors: Errors[]
  topErrorsByLabel: Top5Errors[]
}

interface Errors {
  count: number
  statusCode: string
  responseMessage: string
  failureMessage: string
}

interface Top5Errors {
  label: string
  error1: LabelError
  error2: LabelError
  error3: LabelError
  error4: LabelError
  error5: LabelError
}

interface LabelError { count: number; error: string }

