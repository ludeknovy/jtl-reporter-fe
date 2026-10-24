import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { DeleteShareLinkComponent } from "./delete-share-link.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("DeleteShareLinkComponent", () => {
  let component: DeleteShareLinkComponent;
  let fixture: ComponentFixture<DeleteShareLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [DeleteShareLinkComponent],
    imports: [ReactiveFormsModule,
        FormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteShareLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
