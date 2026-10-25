import { TestBed } from "@angular/core/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";

import { ApiTokenService } from "./api-token.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("ApiTokenService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it("should be created", () => {
    const service: ApiTokenService = TestBed.inject(ApiTokenService);
    expect(service).toBeTruthy();
  });
});
