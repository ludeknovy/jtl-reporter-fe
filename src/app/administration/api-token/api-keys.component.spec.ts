import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ApiKeysComponent } from "./api-keys.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { AddTokenComponent } from "./add-token/add-token.component";
import { ControlPanelComponent } from "src/app/shared/control-panel/control-panel.component";
import { DeleteTokenComponent } from "./delete-token/delete-token.component";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpRequestInterceptorMock } from "src/app/_interceptors/mock-interceptor";


describe("ApiKeysComponent", () => {
  let component: ApiKeysComponent;
  let fixture: ComponentFixture<ApiKeysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
      declarations: [ApiKeysComponent, NavigationComponent, AddTokenComponent, ControlPanelComponent, DeleteTokenComponent],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptorMock,
        multi: true
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
