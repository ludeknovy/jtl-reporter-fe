import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { MyProfileComponent } from "./my-profile.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { ControlPanelComponent } from "src/app/shared/control-panel/control-panel.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("MyProfileComponent", () => {
  let component: MyProfileComponent;
  let fixture: ComponentFixture<MyProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ MyProfileComponent, NavigationComponent, ControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
