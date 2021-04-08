import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighchartsChartModule } from 'highcharts-angular';

import { ScenarioTrendsComponent } from './scenario-trends.component';

describe('ScenarioTrendsComponent', () => {
  let component: ScenarioTrendsComponent;
  let fixture: ComponentFixture<ScenarioTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScenarioTrendsComponent],
      imports: [
        HighchartsChartModule,
        NgbModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioTrendsComponent);
    component = fixture.componentInstance;
    component.params = { scenarioName: 'test', projectName: 'test' };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
