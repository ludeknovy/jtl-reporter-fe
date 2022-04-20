import { TestBed } from "@angular/core/testing";

import { ItemChartService } from "./item-chart.service";

describe("ItemChartService", () => {
  let service: ItemChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemChartService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
