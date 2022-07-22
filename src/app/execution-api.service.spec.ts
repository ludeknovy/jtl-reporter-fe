import { TestBed } from '@angular/core/testing';

import { ExecutionApiService } from './execution-api.service';

describe('ExecutionApiService', () => {
  let service: ExecutionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
