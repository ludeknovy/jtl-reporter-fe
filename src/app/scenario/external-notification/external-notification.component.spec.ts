import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { HttpRequestInterceptorMock } from "src/app/_interceptors/mock-interceptor";
import { AddNewExternalNotificationComponent } from "./add-new-external-notification/add-new-external-notification.component";
import { DeleteExternalNotificationComponent } from "./delete-external-notification/delete-external-notification.component";

import { ExternalNotificationComponent } from "./external-notification.component";

describe("ExternalNotificationComponent", () => {
  let component: ExternalNotificationComponent;
  let fixture: ComponentFixture<ExternalNotificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExternalNotificationComponent,
        AddNewExternalNotificationComponent,
        DeleteExternalNotificationComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule, DataTableModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptorMock,
        multi: true
      }]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalNotificationComponent);
    component = fixture.componentInstance;
    component.params = { projectName: "test-project" };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
