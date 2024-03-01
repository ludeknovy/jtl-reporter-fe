import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MinTestDurationWarningComponent } from "./min-test-duration-warning.component";

describe("MinTestDurationWarningComponent", () => {
  let component: MinTestDurationWarningComponent;
  let fixture: ComponentFixture<MinTestDurationWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinTestDurationWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinTestDurationWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
