export interface ItemsListing {
  id: string;
  name: string;
  projectName: string;
  environment: string;
  startTime: string;
  status: string;
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
  testName: string;
  note: string;
  hostname: string;
  environment: string;
  plot: ItemDataPlot;
  statistics: ItemStatistics[];
  thresholds?: {
    passed: boolean,
    diff: {
      errorRateDiff: number,
      percentileRateDiff: number,
      throughputRateDiff: number
    }
  };
  topMetricsSettings: TopMetricsSettings;
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
  timePoints: string[];
  errorRate: number[];
  id: string;
  n0: number[];
  n5: number[];
  n9: number[];
  throughput: number[];
  threads: number[];
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
