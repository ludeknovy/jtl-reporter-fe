import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ScenarioShareTokenComponent } from "./scenario-share-token.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("ShareTokenComponent", () => {
  let component: ScenarioShareTokenComponent;
  let fixture: ComponentFixture<ScenarioShareTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ScenarioShareTokenComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
