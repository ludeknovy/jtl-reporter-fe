import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { CreateNewShareLinkComponent } from "./create-new-share-link.component";

describe("CreateNewShareLinkComponent", () => {
  let component: CreateNewShareLinkComponent;
  let fixture: ComponentFixture<CreateNewShareLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewShareLinkComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
      ]
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
