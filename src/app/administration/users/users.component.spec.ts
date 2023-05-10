import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { UsersComponent } from "./users.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { ControlPanelComponent } from "src/app/shared/control-panel/control-panel.component";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DeleteUserComponent } from "./delete-user/delete-user.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpRequestInterceptorMock } from "src/app/_interceptors/mock-interceptor";



describe("UsersComponent", () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [
        UsersComponent, NavigationComponent,
        AddUserComponent, ControlPanelComponent,
        DeleteUserComponent,
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
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
