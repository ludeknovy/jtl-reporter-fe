import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { CreateNewShareLinkComponent } from "./create-new-share-link.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("CreateNewShareLinkComponent", () => {
  let component: CreateNewShareLinkComponent;
  let fixture: ComponentFixture<CreateNewShareLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [CreateNewShareLinkComponent],
    imports: [ReactiveFormsModule,
        FormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewShareLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
