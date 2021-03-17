import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeChartsComponent } from './analyze-charts.component';

describe('AnalyzeChartsComponent', () => {
  let component: AnalyzeChartsComponent;
  let fixture: ComponentFixture<AnalyzeChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
