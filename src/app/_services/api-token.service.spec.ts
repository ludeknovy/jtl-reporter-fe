import { TestBed } from '@angular/core/testing';

import { ApiTokenService } from './api-token.service';

describe('ApiTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTokenService = TestBed.get(ApiTokenService);
    expect(service).toBeTruthy();
  });
});
