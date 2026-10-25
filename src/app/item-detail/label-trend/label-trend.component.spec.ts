import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HighchartsChartModule } from "highcharts-angular";
import { LabelTrendComponent } from "../label-trend/label-trend.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";


describe("RequestStatsCompareComponent", () => {
  let component: LabelTrendComponent;
  let fixture: ComponentFixture<LabelTrendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        LabelTrendComponent,
    ],
    imports: [NgbModule,
        HighchartsChartModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
