import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighchartsChartModule } from 'highcharts-angular';
import { LabelChartComponent } from './label-chart.component';

describe('LabelChartComponent', () => {
  let component: LabelChartComponent;
  let fixture: ComponentFixture<LabelChartComponent>;

  beforeEach(waitForAsync(() => {
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
    component.labels = new Map([
      ['Throughput', {}]]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
