import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighchartsChartModule } from 'highcharts-angular';
import { AddMetricComponent } from './add-metric/add-metric.component';

import { AnalyzeChartsComponent } from './analyze-charts.component';

describe('AnalyzeChartsComponent', () => {
  let component: AnalyzeChartsComponent;
  let fixture: ComponentFixture<AnalyzeChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeChartsComponent, AddMetricComponent ],
      imports: [
        HighchartsChartModule,
        NgbModule,
        FormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeChartsComponent);
    component = fixture.componentInstance;
    component.chartLines = { labels: new Map([['test', [{ name: 'test', data: []}]]]), overall: new Map() };
    component.params = { projectName: 'test', scenarioName: 'test', id: 'id' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
