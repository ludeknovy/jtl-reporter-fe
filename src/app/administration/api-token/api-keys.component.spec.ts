import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ApiKeysComponent } from "./api-keys.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { AddTokenComponent } from "./add-token/add-token.component";
import { ControlPanelComponent } from "src/app/shared/control-panel/control-panel.component";
import { DeleteTokenComponent } from "./delete-token/delete-token.component";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpRequestInterceptorMock } from "src/app/_interceptors/mock-interceptor";


describe("ApiKeysComponent", () => {
  let component: ApiKeysComponent;
  let fixture: ComponentFixture<ApiKeysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ApiKeysComponent, NavigationComponent, AddTokenComponent, ControlPanelComponent, DeleteTokenComponent],
    imports: [RouterTestingModule, ReactiveFormsModule],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptorMock,
            multi: true
        }, provideHttpClient(withInterceptorsFromDi())]
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
