import { TestBed } from "@angular/core/testing";

import { AnalyzeChartService } from "./analyze-chart.service";

describe("AnalyzeChartService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AnalyzeChartService = TestBed.inject(AnalyzeChartService);
    expect(service).toBeTruthy();
  });
});
