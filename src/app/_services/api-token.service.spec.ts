import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ApiTokenService } from "./api-token.service";

describe("ApiTokenService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it("should be created", () => {
    const service: ApiTokenService = TestBed.get(ApiTokenService);
    expect(service).toBeTruthy();
  });
});
