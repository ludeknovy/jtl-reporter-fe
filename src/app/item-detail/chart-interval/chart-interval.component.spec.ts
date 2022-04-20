import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChartIntervalComponent } from "./chart-interval.component";

describe("ChartIntervalComponent", () => {
  let component: ChartIntervalComponent;
  let fixture: ComponentFixture<ChartIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartIntervalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
