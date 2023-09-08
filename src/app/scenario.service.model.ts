export interface Scenario {
  analysisEnabled: boolean;
  zeroErrorToleranceEnabled: boolean;
  name: string;
  keepTestRunsPeriod: number;
  thresholds: {
    enabled: boolean;
    percentile: number;
    throughput: number;
    errorRate: number;
  };
  labelFilterSettings: [{ operator: string, labelTerm: string }];
  userSettings: {
    requestStats?: RequestStats
  };
  baselineReport: string;
}


export interface RequestStats {
  avg: boolean
  errorRate: boolean
  max: boolean
  min: boolean
  network: boolean
  p50: boolean
  p90: boolean
  p95: boolean
  p99: boolean
  samples: boolean
  throughput: boolean
  apdex: boolean
  standardDeviation: boolean
  failures: boolean
}
