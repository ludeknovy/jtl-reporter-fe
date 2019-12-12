import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './user-service.service';

describe('UserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
