import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DeleteScenarioShareTokenComponent } from "./delete-scenario-share-token.component";

describe("DeleteShareTokenComponent", () => {
  let component: DeleteScenarioShareTokenComponent;
  let fixture: ComponentFixture<DeleteScenarioShareTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteScenarioShareTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteScenarioShareTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
