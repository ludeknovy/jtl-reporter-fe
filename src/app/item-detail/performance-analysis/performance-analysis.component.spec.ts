import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceAnalysisComponent } from './performance-analysis.component';

describe('PerformanceAnalysisComponent', () => {
  let component: PerformanceAnalysisComponent;
  let fixture: ComponentFixture<PerformanceAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
