import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChartIntervalComponent } from "./chart-interval.component";
import { ReactiveFormsModule } from "@angular/forms";

describe("ChartIntervalComponent", () => {
  let component: ChartIntervalComponent;
  let fixture: ComponentFixture<ChartIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartIntervalComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
