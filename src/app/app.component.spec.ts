import { TestBed, waitForAsync } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { TopPanelComponent } from "./top-panel/top-panel.component";
import { NotificationComponent } from "./notification/notification.component";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { AddNewProjectComponent } from "./administration/projects/add-project/add-project-modal.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("AppComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        AppComponent,
        TopPanelComponent,
        NotificationComponent,
        AddNewProjectComponent,
    ],
    imports: [RouterTestingModule,
        NgxSpinnerModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));
  it("should create the app", waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'jtl-reporter'`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("jtl-reporter");
  }));
});
