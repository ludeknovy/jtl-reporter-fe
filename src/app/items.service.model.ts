export interface ItemsListing {
  id: string;
  name: string;
  project_name: string;
  environment: string;
  upload_time: string;
}

export interface Items {
  name: string;
  data: ItemsListing[];
  total: number;
}

export interface ItemDetail {
  overview: {
    avgLatency: number
    avgResponseTime: number
    duration: number
    endDate: string
    errorRate: number
    maxVu: number
    percentil: number
    startDate: string
    throughput: number
  };
  baseId: string;
  testName: string;
  note: string;
  environment: string;
  plot: {
    responseTime: [{
      name: string,
      data: any[],
      type: any;
    }],
    throughput: [{
      name: string,
      data: any[],
      type: any;
    }],
    overallTimeResponse: any,
    overallThroughput: any
    overAllFailRate: any
    threads: any;

  };
  statistics: any;
  attachements: [];
}

export interface ScenarioTrendsData {
  overview: any;
  start_time: string;
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
