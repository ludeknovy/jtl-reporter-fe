import { TestBed } from '@angular/core/testing';

import { ComparisonStatsService } from './comparison-stats.service';

describe('ComparisonStatsService', () => {
  let service: ComparisonStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparisonStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
