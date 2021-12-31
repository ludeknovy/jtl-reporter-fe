import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RequestHttpInterceptor } from './_interceptors/http-interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeAgoPipe } from 'time-ago-pipe';
import { DataTableModule } from '@rushvora/ng-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HighchartsChartModule } from 'highcharts-angular';
import { ErrorInterceptor } from './_interceptors/error-interceptor';
import { JwtInterceptor } from './_interceptors/jwt-interceptor';
import {AppRoutingModule} from './AppRoutingModule';
import {ScenarioModule} from './scenario/scenario.module';
import {SharedModule} from './shared/shared.module';
import {ItemDetailModule} from './item-detail/item-detail.module';
import {InitUserModule} from './init-user/init-user.module';
import {AdministrationModule} from './administration/administration.module';
import {RouterModule} from '@angular/router';
import {NotificationComponent} from './notification/notification.component';
import {TopPanelComponent} from './top-panel/top-panel.component';
import {ProjectAdministrationModule} from './administration/projects/project-administration.module';
import {ProjectModule} from './project/project.module';


@NgModule({
  declarations: [
    AppComponent,
    TopPanelComponent,
    TimeAgoPipe,
    NotificationComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DataTableModule,
    ScenarioModule,
    SharedModule,
    RouterModule,
    NgxSpinnerModule,
    ItemDetailModule,
    InitUserModule,
    AdministrationModule,
    ProjectAdministrationModule,
    ProjectModule,
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
