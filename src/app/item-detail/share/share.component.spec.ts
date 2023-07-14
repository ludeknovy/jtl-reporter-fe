import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DataTableModule } from "@pascalhonegger/ng-datatable";
import { HttpRequestInterceptorMock } from "src/app/_interceptors/mock-interceptor";
import { CreateNewShareLinkComponent } from "./create-new-share-link/create-new-share-link.component";
import { DeleteShareLinkComponent } from "./delete-share-link/delete-share-link.component";

import { ShareComponent } from "./share.component";

describe("ShareComponent", () => {
  let component: ShareComponent;
  let fixture: ComponentFixture<ShareComponent>;




  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareComponent, CreateNewShareLinkComponent, DeleteShareLinkComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        DataTableModule
      ],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptorMock,
        multi: true
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareComponent);
    component = fixture.componentInstance;
    component.params = { projectName: "test-project", scenarioName: "test-scenario", "id": "test-item" };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
