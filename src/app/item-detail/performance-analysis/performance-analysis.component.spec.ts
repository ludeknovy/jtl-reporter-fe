import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PerformanceAnalysisComponent } from './performance-analysis.component';

describe('PerformanceAnalysisComponent', () => {
  let component: PerformanceAnalysisComponent;
  let fixture: ComponentFixture<PerformanceAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceAnalysisComponent],
      imports: [NgbModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceAnalysisComponent);
    component = fixture.componentInstance;
    component.itemData = { analaysisEnabled: true };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});