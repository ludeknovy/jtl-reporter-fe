import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from '@rushvora/ng-datatable';
import { HighchartsChartModule } from 'highcharts-angular';
import { ToastrModule } from 'ngx-toastr';
import { LabelErrorComponent } from '../label-error/label-error.component';
import { LabelTrendComponent } from '../label-trend/label-trend.component';
import { StatsCompareComponent } from '../stats-compare/stats-compare.component';
import { LabelHealthComponent } from './label-health/label-health.component';

import { RequestStatsCompareComponent } from './request-stats-compare.component';

describe('RequestStatsCompareComponent', () => {
  let component: RequestStatsCompareComponent;
  let fixture: ComponentFixture<RequestStatsCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RequestStatsCompareComponent,
        StatsCompareComponent,
        LabelErrorComponent,
        LabelTrendComponent,
        LabelHealthComponent,
      ],
      imports: [
        DataTableModule,
        NgbModule,
        ToastrModule.forRoot(),
        HighchartsChartModule,
        HttpClientModule,
        RouterTestingModule,

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatsCompareComponent);
    component = fixture.componentInstance;
    component.itemData = {
      overview: {
        maxVu: 100
      },
      statistics: [{
        avgResponseTime: 10,
        bytes: 758,
        errorRate: 0,
        label: '02 - Click_Log_In-22',
        maxResponseTime: 38,
        minResponseTime: 8,
        n0: 33,
        n5: 34,
        n9: 37,
        samples: 200,
        throughput: 0.17,
        responseMessageFailures: [
          { responseMessage: 'error', count: 1 }
        ],
        statusCodes: [{
          statusCode: 200, count: 1
        }],
      }, {
        avgResponseTime: 10,
        bytes: 758,
        errorRate: 0,
        label: '02 - Click_Log_In-21',
        maxResponseTime: 38,
        minResponseTime: 8,
        n0: 33,
        n5: 34,
        n9: 37,
        samples: 200,
        throughput: 0.17,
        responseMessageFailures: [
          { responseMessage: 'error', count: 1 }
        ],
        statusCodes: [{
          statusCode: 200, count: 1
        }],
      },
      {
        avgResponseTime: 10,
        bytes: 758,
        errorRate: 0,
        label: '03 - Click_Log_In-20',
        maxResponseTime: 38,
        minResponseTime: 8,
        n0: 33,
        n5: 34,
        n9: 37,
        samples: 200,
        throughput: 0.17,
        responseMessageFailures: [
          { responseMessage: 'error', count: 1 }
        ],
        statusCodes: [{
          statusCode: 200, count: 1
        }],
      },]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call resetStatsData when itemToCompare triggered', () => {
    const spy = spyOn(component, 'resetStatsData').and.callThrough();
    component.itemToCompare({
      maxVu: 100,
      id: '123-123',
      statistics: [{
        avgResponseTime: 109,
        bytes: 7587,
        errorRate: 0,
        label: '02 - Click_Log_In-22',
        maxResponseTime: 380,
        minResponseTime: 81,
        n0: 330,
        n5: 344,
        n9: 372,
        samples: 200,
        throughput: 0.17,
      }]
    });
    expect(spy).toHaveBeenCalled();
  });
  describe('label search', () => {
    it('should search fulltext', () => {
      component.search('02');
      expect(component.labelsData.length).toBe(2);
    });
    it('should correctly filter out labels if NOT keyword used', () => {
      component.search('not "02 - Click_Log_In-22"');
      expect(component.labelsData.map(x => x.label))
        .toEqual(['02 - Click_Log_In-21', '03 - Click_Log_In-20']);
    });
    it('should correctly filter out if OR keyword used', () => {
      component.search('"02 - Click_Log_In-22" or "03 - Click_Log_In-20"');
      expect(component.labelsData.length).toBe(2);
      expect(component.labelsData.map(x => x.label))
        .toEqual(['02 - Click_Log_In-22', '03 - Click_Log_In-20']);
    });
  });

});
