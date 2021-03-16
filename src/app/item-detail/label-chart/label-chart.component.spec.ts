import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelChartComponent } from './label-chart.component';

describe('LabelChartComponent', () => {
  let component: LabelChartComponent;
  let fixture: ComponentFixture<LabelChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
