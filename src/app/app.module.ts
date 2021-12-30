import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RequestHttpInterceptor } from './_interceptors/http-interceptor';
import { ItemChartComponent } from './item-detail/chart/item-chart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification/notification.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { DataTableModule } from '@rushvora/ng-datatable';
import { DeleteItemComponent } from './item-detail/delete-item/delete-item.component';
import { ScenariosGraphComponent } from './project/graph/scenarios-graph.component';
import { EditItemComponent } from './item-detail/edit-item/edit-item.component';
import { AddNewScenarioComponent } from './project/new-scenario/add-new.scenario.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StatsCompareComponent } from './item-detail/stats-compare/stats-compare.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LabelTrendComponent } from './item-detail/label-trend/label-trend.component';
import { MonitoringStatsComponent } from './item-detail/monitoring-stats/monitoring-stats.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ErrorInterceptor } from './_interceptors/error-interceptor';
import { JwtInterceptor } from './_interceptors/jwt-interceptor';
import { NavigationComponent } from './administration/navigation/navigation.component';
import { AddTokenComponent } from './administration/api-token/add-token/add-token.component';
import { DeleteTokenComponent } from './administration/api-token/delete-token/delete-token.component';
import { AddUserComponent } from './administration/users/add-user/add-user.component';
import { DeleteUserComponent } from './administration/users/delete-user/delete-user.component';
// tslint:disable-next-line:max-line-length
import { AddNewExternalNotificationComponent } from './scenario/external-notification/add-new-external-notification/add-new-external-notification.component';
// tslint:disable-next-line:max-line-length
import { DeleteExternalNotificationComponent } from './scenario/external-notification/delete-external-notification/delete-external-notification.component';
import { ItemControlsComponent } from './scenario/item-controls/item-controls.component';
import { ShareComponent } from './item-detail/share/share.component';
import { CreateNewShareLinkComponent } from './item-detail/share/create-new-share-link/create-new-share-link.component';
import { DeleteShareLinkComponent } from './item-detail/share/delete-share-link/delete-share-link.component';
import { ThresholdsAlertComponent } from './item-detail/thresholds-alert/thresholds-alert.component';
import { PerformanceAnalysisComponent } from './item-detail/performance-analysis/performance-analysis.component';
import { LabelChartComponent } from './item-detail/label-chart/label-chart.component';
import { AnalyzeChartsComponent } from './item-detail/analyze-charts/analyze-charts.component';
import { AddMetricComponent } from './item-detail/analyze-charts/add-metric/add-metric.component';
import { RequestStatsCompareComponent } from './item-detail/request-stats/request-stats-compare.component';
import { InitUserComponent } from './init-user/init-user.component';
import { LabelHealthComponent } from './item-detail/request-stats/label-health/label-health.component';
import { ZeroErrorToleranceWarningComponent } from './item-detail/zero-error-tolerance-warning/zero-error-tolerance-warning.component';
import {AppRoutingModule} from './AppRoutingModule';
import {ScenarioModule} from './scenario/scenario.module';
import {SharedModule} from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ItemChartComponent,
    NotificationComponent,
    EditItemComponent,
    TimeAgoPipe,
    DeleteItemComponent,
    ScenariosGraphComponent,
    AddNewScenarioComponent,
    StatsCompareComponent,
    LabelTrendComponent,
    MonitoringStatsComponent,
    NavigationComponent,
    AddTokenComponent,
    DeleteTokenComponent,
    AddUserComponent,
    DeleteUserComponent,
    AddNewExternalNotificationComponent,
    DeleteExternalNotificationComponent,
    ItemControlsComponent,
    ShareComponent,
    CreateNewShareLinkComponent,
    DeleteShareLinkComponent,
    ThresholdsAlertComponent,
    PerformanceAnalysisComponent,
    LabelChartComponent,
    AnalyzeChartsComponent,
    AddMetricComponent,
    RequestStatsCompareComponent,
    LabelHealthComponent,
    ZeroErrorToleranceWarningComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    HighchartsChartModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    DataTableModule,
    ScenarioModule,
    SharedModule,
    NgxSpinnerModule,
  ],
  providers: [
    // no need to place any providers due to the `providedIn` flag...
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
