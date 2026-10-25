import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DeleteScenarioShareTokenComponent } from "./delete-scenario-share-token.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("DeleteShareTokenComponent", () => {
  let component: DeleteScenarioShareTokenComponent;
  let fixture: ComponentFixture<DeleteScenarioShareTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [DeleteScenarioShareTokenComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteScenarioShareTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
