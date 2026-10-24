import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GlobalSettingsComponent } from "./global-settings.component";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpRequestInterceptorMock } from "../../_interceptors/mock-interceptor";

describe("GlobalSettingsComponent", () => {
  let component: GlobalSettingsComponent;
  let fixture: ComponentFixture<GlobalSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [GlobalSettingsComponent],
    imports: [RouterTestingModule, ReactiveFormsModule],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptorMock,
            multi: true
        }, provideHttpClient(withInterceptorsFromDi())]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
