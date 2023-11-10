import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NewScenarioShareTokenComponent } from "./new-scenario-share-token.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("NewShareTokenComponent", () => {
  let component: NewScenarioShareTokenComponent;
  let fixture: ComponentFixture<NewScenarioShareTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewScenarioShareTokenComponent],
      imports: [
        HttpClientTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScenarioShareTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
