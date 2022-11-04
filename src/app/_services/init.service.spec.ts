import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { InitService } from "./init.service";

describe("InitService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it("should be created", () => {
    const service: InitService = TestBed.get(InitService);
    expect(service).toBeTruthy();
  });
});
