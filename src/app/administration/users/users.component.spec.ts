import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { UsersComponent } from "./users.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { ControlPanelComponent } from "src/app/shared/control-panel/control-panel.component";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { DeleteUserComponent } from "./delete-user/delete-user.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { HttpRequestInterceptorMock } from "src/app/_interceptors/mock-interceptor";



describe("UsersComponent", () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        UsersComponent, NavigationComponent,
        AddUserComponent, ControlPanelComponent,
        DeleteUserComponent,
    ],
    imports: [RouterTestingModule, ReactiveFormsModule],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptorMock,
            multi: true
        }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
