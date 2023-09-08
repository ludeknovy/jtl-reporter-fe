import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HighchartsChartModule } from "highcharts-angular";
import { HttpRequestInterceptorMock } from "src/app/_interceptors/mock-interceptor";
import { AddMetricComponent } from "./add-metric/add-metric.component";

import { AnalyzeChartsComponent } from "./analyze-charts.component";

describe("AnalyzeChartsComponent", () => {
  let component: AnalyzeChartsComponent;
  let fixture: ComponentFixture<AnalyzeChartsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeChartsComponent, AddMetricComponent ],
      imports: [
        HighchartsChartModule,
        NgbModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptorMock,
        multi: true
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeChartsComponent);
    component = fixture.componentInstance;
    component.chartLines = { labels: new Map([["test", [{ name: "test", data: [], suffix: " ms" }]]]), overall: new Map(), scatter: new Map() };
    component.params = { projectName: "test-project", scenarioName: "test-scenario", id: "test-item" };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
