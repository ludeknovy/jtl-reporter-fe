import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RequestHttpInterceptor } from './http-interceptor';
import { TopPanelComponent } from './top-panel/top-panel.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemChartComponent } from './item-detail/chart/item-chart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNewItemComponent } from './scenario/add-new-item/add-new-item.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministrationComponent } from './administration/administration.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AddNewProjectComponent } from './administration/add-project/add-project-modal.component';
import { EditProjectComponent } from './administration/edit-project/edit-project.component';
import { DeleteProjectComponent } from './administration/delete-project/delete-project.component';
import { DeleteItemComponent } from './item-detail/delete-item/delete-item.component';
import { ScenariosComponent } from './scenarios/scenarios.component';
import { ScenariosGraphComponent } from './scenarios/graph/scenarios-graph.component';
import { ScenarioGraphComponent } from './scenario/graphs/scenario-graph.component';
import { EditItemComponent } from './item-detail/edit-item/edit-item.component';
import { AddNewScenarioComponent } from './scenarios/new-scenario/add-new.scenario.component';
import { EditScenarioComponent } from './scenario/edit-scenario/edit-scenario.component';
import { DeleteScenarioComponent } from './scenario/delete-scenario/delete-scenario.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {DataTableModule} from 'angular-6-datatable';
import { ChartModule } from 'angular-highcharts';
import { StatsCompareComponent } from './item-detail/stats-compare/stats-compare.component';
import { AttachementsComponent } from './item-detail/attachements/attachements.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LabelTrendComponent } from './item-detail/label-trend/label-trend.component';
import { MonitoringStatsComponent } from './item-detail/monitoring-stats/monitoring-stats.component';


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'administration', component: AdministrationComponent },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'project/:projectName/scenario/:scenarioName/items', component: ScenarioComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'project/:projectName/scenario/:scenarioName/items', component: TopPanelComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'project/:projectName/scenario/:scenarioName/item/:id', component: ItemDetailComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'project/:projectName/scenarios', component: ScenariosComponent,
    runGuardsAndResolvers: 'always'
  },
  { path: '**', component: AppComponent }
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
    AdministrationComponent,
    TimeAgoPipe,
    EditProjectComponent,
    DeleteProjectComponent,
    DeleteItemComponent,
    ScenariosComponent,
    ScenariosGraphComponent,
    ScenarioGraphComponent,
    AddNewScenarioComponent,
    EditScenarioComponent,
    DeleteScenarioComponent,
    StatsCompareComponent,
    AttachementsComponent,
    ControlPanelComponent,
    BreadcrumbComponent,
    LabelTrendComponent,
    MonitoringStatsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,
        onSameUrlNavigation: 'reload'
      }
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
    DataTableModule,
    ChartModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [
    // no need to place any providers due to the `providedIn` flag...
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
