import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { HighchartsChartModule } from "highcharts-angular";
import { ToastrModule } from "ngx-toastr";
import { ExcelService } from "src/app/_services/excel.service";
import { LabelTrendComponent } from "../label-trend/label-trend.component";
import { StatsCompareComponent } from "../stats-compare/stats-compare.component";
import { LabelHealthComponent } from "./label-health/label-health.component";

import { RequestStatsComponent } from "./request-stats.component";

describe("RequestStatsCompareComponent", () => {
  let component: RequestStatsComponent;
  let fixture: ComponentFixture<RequestStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        RequestStatsComponent,
        StatsCompareComponent,
        LabelTrendComponent,
        LabelHealthComponent,
      ],
      imports: [
        DataTableModule,
        NgbModule,
        ToastrModule.forRoot(),
        HighchartsChartModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [ExcelService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatsComponent);
    component = fixture.componentInstance;
    component.itemData = {
      environment: "",
      extraPlotData: [],
      hostname: "",
      monitoring: { cpu: { data: [] } },
      name: "",
      note: "",
      plot: undefined,
      reportStatus: undefined,
      topMetricsSettings: undefined,
      zeroErrorToleranceEnabled: false,
      status: "10",
      minTestDuration: 2,
      overview: {
        maxVu: 100,
        avgConnect: 100,
        avgLatency: 10,
        avgResponseTime: 99,
        duration: 100,
        endDate: "",
        startDate: "",
        errorCount: 0,
        percentil: null,
        percentile90: 10,
        percentile95: 10,
        percentile99: 10,
        errorRate: 0,
        throughput: 100
      },
      analysisEnabled: false,
      userSettings: {
        requestStats: {
          avg: true,
          samples: true,
          max: true,
          p99: true,
          p90: true,
          throughput: true,
          network: true,
          errorRate: true,
          min: true,
          p95: true,
          p50: true,
          apdex: true,
          standardDeviation: true,
          failures: true,
        }
      },
      baseId: "",
      statistics: [{
        avgResponseTime: 10,
        bytes: 758,
        errorRate: 0,
        label: "02 - Click_Log_In-22",
        maxResponseTime: 38,
        minResponseTime: 8,
        n0: 33,
        n5: 34,
        n9: 37,
        samples: 200,
        throughput: 0.17,
        responseMessageFailures: [
          { responseMessage: "error", count: 1 }
        ],
        apdex: {
          toleration: 100,
          satisfaction: 400,
        }
      }, {
        avgResponseTime: 10,
        bytes: 758,
        errorRate: 0,
        label: "02 - Click_Log_In-21",
        maxResponseTime: 38,
        minResponseTime: 8,
        n0: 33,
        n5: 34,
        n9: 37,
        samples: 200,
        throughput: 0.17,
        responseMessageFailures: [
          { responseMessage: "error", count: 1 }
        ],
        apdex: {
          toleration: 20,
          satisfaction: 4,
        }
      },
        {
          avgResponseTime: 10,
          bytes: 758,
          errorRate: 0,
          label: "03 - Click_Log_In-20",
          maxResponseTime: 38,
          minResponseTime: 8,
          n0: 33,
          n5: 34,
          n9: 37,
          samples: 200,
          throughput: 0.17,
          responseMessageFailures: [
            { responseMessage: "error", count: 1 }
          ],
          apdex: {
            toleration: 10,
            satisfaction: 40,
          }
        },],
      errorSummary: {
        groupedErrors: [],
        topErrorsByLabel: []
      }
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("label search", () => {
    it("should search fulltext", () => {
      component.search("02");
      expect(component.labelsData.length).toBe(2);
    });
    it("should correctly filter out labels if NOT keyword used", () => {
      component.search("not \"02 - Click_Log_In-22\"");
      expect(component.labelsData.map(x => x.label))
        .toEqual(["02 - Click_Log_In-21", "03 - Click_Log_In-20"]);
    });
    it("should correctly filter out if OR keyword used", () => {
      component.search("\"02 - Click_Log_In-22\" or \"03 - Click_Log_In-20\"");
      expect(component.labelsData.length).toBe(2);
      expect(component.labelsData.map(x => x.label))
        .toEqual(["02 - Click_Log_In-22", "03 - Click_Log_In-20"]);
    });
  });
});
