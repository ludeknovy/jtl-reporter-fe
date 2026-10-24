import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { AddTokenComponent } from "./add-token.component";
import { ReactiveFormsModule } from "@angular/forms";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("AddTokenComponent", () => {
  let component: AddTokenComponent;
  let fixture: ComponentFixture<AddTokenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AddTokenComponent],
    imports: [ReactiveFormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
