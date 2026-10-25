import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HighchartsChartModule } from "highcharts-angular";

import { ScenarioTrendsComponent } from "./scenario-trends.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("ScenarioTrendsComponent", () => {
  let component: ScenarioTrendsComponent;
  let fixture: ComponentFixture<ScenarioTrendsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ScenarioTrendsComponent],
    imports: [HighchartsChartModule,
        NgbModule,
        RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioTrendsComponent);
    component = fixture.componentInstance;
    component.params = { scenarioName: "test", projectName: "test" };

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
