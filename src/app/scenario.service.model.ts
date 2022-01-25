export interface Scenario {
  analysisEnabled: boolean;
  zeroErrorToleranceEnabled: boolean;
  name: string;
  keepTestRunsPeriod: number;
  thresholds: {
    enabled: boolean;
    percentile: number;
    throughput: number;
    erroRate: number;
  };
}
