import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ApiTokenService } from './api-token.service';

describe('ApiTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: ApiTokenService = TestBed.get(ApiTokenService);
    expect(service).toBeTruthy();
  });
});
