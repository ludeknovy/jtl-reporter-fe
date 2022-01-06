import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HighchartsChartModule } from "highcharts-angular";

import { SettingsScenarioComponent } from "./scenario-settings.component";

describe("SettingsScenarioComponent", () => {
  let component: SettingsScenarioComponent;
  let fixture: ComponentFixture<SettingsScenarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsScenarioComponent],
      imports: [
        HighchartsChartModule,
        NgbModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsScenarioComponent);
    component = fixture.componentInstance;
    component.params = { scenarioName: "test", projectName: "test" };

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
