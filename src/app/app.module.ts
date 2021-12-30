import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RequestHttpInterceptor } from './_interceptors/http-interceptor';
import { TopPanelComponent } from './top-panel/top-panel.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemChartComponent } from './item-detail/chart/item-chart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNewItemComponent } from './scenario/add-new-item/add-new-item.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsAdministrationComponent } from './administration/projects/administration.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { DataTableModule } from '@rushvora/ng-datatable';
import { AddNewProjectComponent } from './administration/projects/add-project/add-project-modal.component';
import { DeleteProjectComponent } from './administration/projects/delete-project/delete-project.component';
import { DeleteItemComponent } from './item-detail/delete-item/delete-item.component';
import { ProjectComponent } from './project/project.component';
import { ScenariosGraphComponent } from './project/graph/scenarios-graph.component';
import { EditItemComponent } from './item-detail/edit-item/edit-item.component';
import { AddNewScenarioComponent } from './project/new-scenario/add-new.scenario.component';
import { SettingsScenarioComponent } from './scenario/scenario-settings/scenario-settings.component';
import { DeleteScenarioComponent } from './scenario/delete-scenario/delete-scenario.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StatsCompareComponent } from './item-detail/stats-compare/stats-compare.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LabelTrendComponent } from './item-detail/label-trend/label-trend.component';
import { MonitoringStatsComponent } from './item-detail/monitoring-stats/monitoring-stats.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from './_interceptors/error-interceptor';
import { JwtInterceptor } from './_interceptors/jwt-interceptor';
import { ApiKeysComponent } from './administration/api-token/api-keys.component';
import { NavigationComponent } from './administration/navigation/navigation.component';
import { AddTokenComponent } from './administration/api-token/add-token/add-token.component';
import { DeleteTokenComponent } from './administration/api-token/delete-token/delete-token.component';
import { MyProfileComponent } from './administration/my-profile/my-profile.component';
import { UsersComponent } from './administration/users/users.component';
import { AddUserComponent } from './administration/users/add-user/add-user.component';
import { DeleteUserComponent } from './administration/users/delete-user/delete-user.component';
import { ExternalNotificationComponent } from './scenario/external-notification/external-notification.component';
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
import { ScenarioTrendsComponent } from './scenario/scenario-trends/scenario-trends.component';
import { ProjectSettingsComponent } from './project/project-settings/project-settings.component';
import { RequestStatsCompareComponent } from './item-detail/request-stats/request-stats-compare.component';
import { InitUserComponent } from './init-user/init-user.component';
import { LabelHealthComponent } from './item-detail/request-stats/label-health/label-health.component';
import { ZeroErrorToleranceWarningComponent } from './item-detail/zero-error-tolerance-warning/zero-error-tolerance-warning.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'administration/projects', component: ProjectsAdministrationComponent, canActivate: [AuthGuard] },
  { path: 'administration/api-keys', component: ApiKeysComponent, canActivate: [AuthGuard] },
  { path: 'administration/my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'administration/users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'project/:projectName/scenario/:scenarioName/items', component: ScenarioComponent,
    runGuardsAndResolvers: 'always', canActivate: [AuthGuard]
  },
  {
    path: 'project/:projectName/scenario/:scenarioName/items', component: TopPanelComponent,
    runGuardsAndResolvers: 'always', canActivate: [AuthGuard]
  },
  {
    path: 'project/:projectName/scenario/:scenarioName/item/:id', component: ItemDetailComponent,
    runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
  },
  {
    path: 'project/:projectName/scenarios', component: ProjectComponent,
    runGuardsAndResolvers: 'always', canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'init', component: InitUserComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    TopPanelComponent,
    ScenarioComponent,
    ItemDetailComponent,
    ItemChartComponent,
    AddNewProjectComponent,
    AddNewItemComponent,
    NotificationComponent,
    DashboardComponent,
    EditItemComponent,
    ProjectsAdministrationComponent,
    TimeAgoPipe,
    DeleteProjectComponent,
    DeleteItemComponent,
    ProjectComponent,
    ScenariosGraphComponent,
    AddNewScenarioComponent,
    SettingsScenarioComponent,
    DeleteScenarioComponent,
    StatsCompareComponent,
    ControlPanelComponent,
    BreadcrumbComponent,
    LabelTrendComponent,
    MonitoringStatsComponent,
    LoginComponent,
    ApiKeysComponent,
    NavigationComponent,
    AddTokenComponent,
    DeleteTokenComponent,
    MyProfileComponent,
    UsersComponent,
    AddUserComponent,
    DeleteUserComponent,
    ExternalNotificationComponent,
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
    ScenarioTrendsComponent,
    ProjectSettingsComponent,
    RequestStatsCompareComponent,
    InitUserComponent,
    LabelHealthComponent,
    ZeroErrorToleranceWarningComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
    enableTracing: true,
    onSameUrlNavigation: 'reload',
    relativeLinkResolution: 'legacy'
}
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
    HighchartsChartModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    DataTableModule
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
