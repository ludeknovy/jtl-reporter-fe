import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { InitUserComponent } from "./init-user.component";

describe("InitUserComponent", () => {
  let component: InitUserComponent;
  let fixture: ComponentFixture<InitUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      declarations: [InitUserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
