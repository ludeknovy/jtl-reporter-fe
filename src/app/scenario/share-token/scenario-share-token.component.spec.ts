import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ScenarioShareTokenComponent } from "./scenario-share-token.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ShareTokenComponent", () => {
  let component: ScenarioShareTokenComponent;
  let fixture: ComponentFixture<ScenarioShareTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioShareTokenComponent ],
      imports:[
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioShareTokenComponent);
    component = fixture.componentInstance;
    component.params = { projectName: "test-project", scenarioName: "test-scenario" };

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
