import { TestBed } from "@angular/core/testing";

import { ComparisonChartService } from "./comparison-chart.service";

describe("ComparisonChartService", () => {
  let service: ComparisonChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparisonChartService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
