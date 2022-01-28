import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RequestHttpInterceptor } from "./_interceptors/http-interceptor";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ErrorInterceptor } from "./_interceptors/error-interceptor";
import { JwtInterceptor } from "./_interceptors/jwt-interceptor";
import { AppRoutingModule } from "./AppRoutingModule";
import { ScenarioModule } from "./scenario/scenario.module";
import { SharedModule } from "./shared/shared.module";
import { ItemDetailModule } from "./item-detail/item-detail.module";
import { InitUserModule } from "./init-user/init-user.module";
import { AdministrationModule } from "./administration/administration.module";
import { ProjectAdministrationModule } from "./administration/projects/project-administration.module";
import { ProjectModule } from "./project/project.module";
import { RouterModule } from "@angular/router";
import { NotificationComponent } from "./notification/notification.component";
import { TimeagoModule } from "ngx-timeago";
import { TopPanelModule } from "./top-panel/top-panel.module";

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    RouterModule,
    ScenarioModule,
    SharedModule,
    ItemDetailModule,
    InitUserModule,
    AdministrationModule,
    ProjectAdministrationModule,
    ProjectModule,
    NgxSpinnerModule,
    TimeagoModule.forRoot(),
    TopPanelModule,
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
