import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ReloadCustomChartComponent } from "./reload-custom-chart.component";

describe("ReloadCustomChartComponent", () => {
  let component: ReloadCustomChartComponent;
  let fixture: ComponentFixture<ReloadCustomChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReloadCustomChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadCustomChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
