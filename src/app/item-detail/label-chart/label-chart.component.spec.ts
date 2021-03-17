import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighchartsChartModule } from 'highcharts-angular';
import { LabelChartComponent } from './label-chart.component';

describe('LabelChartComponent', () => {
  let component: LabelChartComponent;
  let fixture: ComponentFixture<LabelChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelChartComponent],
      imports: [
        HighchartsChartModule,
        NgbModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelChartComponent);
    component = fixture.componentInstance;
    component.labels = new Map();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
