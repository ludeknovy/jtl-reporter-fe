export interface Scenario {
  analysisEnabled: boolean;
  zeroErrorToleranceEnabled: boolean;
  name: string;
  thresholds: {
    enabled: boolean;
    percentile: number;
    throughput: number;
    erroRate: number;
  };
}
