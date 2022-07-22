export interface Scenario {
  analysisEnabled: boolean;
  zeroErrorToleranceEnabled: boolean;
  name: string;
  keepTestRunsPeriod: number;
  id: string;
  thresholds: {
    enabled: boolean;
    percentile: number;
    throughput: number;
    errorRate: number;
  };
  labelFilterSettings: [{ operator: string, labelTerm: string }]
}


export interface ExecutionFile { filename: string, id: string}
