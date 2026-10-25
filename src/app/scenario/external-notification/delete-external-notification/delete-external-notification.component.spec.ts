import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { DeleteExternalNotificationComponent } from "./delete-external-notification.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("DeleteExternalNotificationComponent", () => {
  let component: DeleteExternalNotificationComponent;
  let fixture: ComponentFixture<DeleteExternalNotificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [DeleteExternalNotificationComponent],
    imports: [RouterTestingModule, ReactiveFormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExternalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
