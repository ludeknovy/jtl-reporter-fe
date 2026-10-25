import { TestBed } from "@angular/core/testing";

import { ScenarioService } from "./scenario.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("ScenarioService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it("should be created", () => {
    const service: ScenarioService = TestBed.inject(ScenarioService);
    expect(service).toBeTruthy();
  });
});
