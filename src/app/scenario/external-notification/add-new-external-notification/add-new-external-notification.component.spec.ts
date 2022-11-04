import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { AddNewExternalNotificationComponent } from "./add-new-external-notification.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("AddNewExternalNotificationComponent", () => {
  let component: AddNewExternalNotificationComponent;
  let fixture: ComponentFixture<AddNewExternalNotificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewExternalNotificationComponent ],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewExternalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
