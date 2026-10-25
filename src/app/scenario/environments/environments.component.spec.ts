import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EnvironmentsComponent } from "./environments.component";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpRequestInterceptorMock } from "../../_interceptors/mock-interceptor";

describe("EnvironmentsComponent", () => {
  let component: EnvironmentsComponent;
  let fixture: ComponentFixture<EnvironmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [EnvironmentsComponent],
    imports: [],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptorMock,
            multi: true
        }, provideHttpClient(withInterceptorsFromDi())]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentsComponent);
    component = fixture.componentInstance;
    component.params = { projectName: "test-project", scenarioName: "test-scenario" };
    component.anonymous = {
      token: "",
      isAnonymous: false,
    }
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
