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
    component.plot = {
      responseTime: [{ data: [], name: 'test' }],
      minResponseTime: [{ data: [], name: 'test' }],
      maxResponseTime: [{ data: [], name: 'test' }],
      throughput: [{ data: [], name: 'test' }],
      network: [{ data: [], name: 'test' }],
      threads: [{ data: [], name: 'test' }],
      overallNetwork: [{ data: [], name: 'test' }],
      overallThroughput: [{ data: [], name: 'test' }],
      overallTimeResponse: [{ data: [], name: 'test' }],
      overAllFailRate: [{ data: [], name: 'test' }],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
