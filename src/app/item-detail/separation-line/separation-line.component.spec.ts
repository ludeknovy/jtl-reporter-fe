import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SeparationLineComponent } from "./separation-line.component";

describe("SeparationLineComponent", () => {
  let component: SeparationLineComponent;
  let fixture: ComponentFixture<SeparationLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeparationLineComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SeparationLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
