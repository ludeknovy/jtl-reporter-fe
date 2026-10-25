import { TestBed, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";


import { AuthGuard } from "./auth.guard";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("AuthGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [AuthGuard, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it("should ...", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
