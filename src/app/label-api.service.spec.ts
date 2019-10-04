import { TestBed } from '@angular/core/testing';

import { LabelApiService } from './label-api.service';

describe('LabelApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabelApiService = TestBed.get(LabelApiService);
    expect(service).toBeTruthy();
  });
});
