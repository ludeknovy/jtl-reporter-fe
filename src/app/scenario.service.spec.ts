import { TestBed } from "@angular/core/testing";

import { ScenarioService } from "./scenario.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClientModule } from "@angular/common/http";

describe("ScenarioService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
  }));

  it("should be created", () => {
    const service: ScenarioService = TestBed.get(ScenarioService);
    expect(service).toBeTruthy();
  });
});
