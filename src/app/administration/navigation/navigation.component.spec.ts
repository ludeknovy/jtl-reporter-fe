import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { RoleDirective } from "src/app/_directives/role.directive";


import { NavigationComponent } from "./navigation.component";

describe("NavigationComponent", () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ NavigationComponent, RoleDirective ]
    })
    .compileComponents();

  const mockLocalStorage = {
    getItem: (key: string): string => {
      return JSON.stringify({ role: "operator"})
    },
  };

  spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
