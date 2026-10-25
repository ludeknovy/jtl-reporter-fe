import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { InitService } from "./init.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("InitService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}));

  it("should be created", () => {
    const service: InitService = TestBed.inject(InitService);
    expect(service).toBeTruthy();
  });
});
