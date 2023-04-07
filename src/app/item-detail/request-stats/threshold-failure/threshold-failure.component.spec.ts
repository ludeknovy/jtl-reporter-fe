import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ThresholdFailureComponent } from "./threshold-failure.component";

describe("ThresholdFailureComponent", () => {
  let component: ThresholdFailureComponent;
  let fixture: ComponentFixture<ThresholdFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThresholdFailureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
