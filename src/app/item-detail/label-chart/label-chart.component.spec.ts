import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HighchartsChartModule } from "highcharts-angular";
import { LabelChartComponent } from "./label-chart.component";
import { Metrics } from "../metrics";

describe("LabelChartComponent", () => {
  let component: LabelChartComponent;
  let fixture: ComponentFixture<LabelChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LabelChartComponent],
      imports: [
        HighchartsChartModule,
        NgbModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelChartComponent);
    component = fixture.componentInstance;
    component.chartLines = {
      labels: new Map([[Metrics.Network, [{ name: "name", suffix: "mbps", data: [] }] ]]),
      overall: new Map([[Metrics.Threads, { name: "virtual-users", data: [] }]]),
      scatter: new Map([[Metrics.ResponseTimeRaw, { data: [] }]])
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
