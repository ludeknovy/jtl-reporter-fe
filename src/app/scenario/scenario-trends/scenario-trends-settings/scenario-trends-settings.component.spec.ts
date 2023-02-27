import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ScenarioTrendsSettingsComponent } from "./scenario-trends-settings.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ScenarioTrendsSettingsComponent", () => {
  let component: ScenarioTrendsSettingsComponent;
  let fixture: ComponentFixture<ScenarioTrendsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScenarioTrendsSettingsComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioTrendsSettingsComponent);
    component = fixture.componentInstance;
    component.userSettings = {
      aggregatedTrends: true,
      labelMetrics: {
        percentile90: true,
        errorRate: true,
        throughput: false,
      }
    }
    component.params = { scenarioName: "test", projectName: "test" };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
